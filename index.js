/**
 * forked from koa-better-ratelimit <https://github.com/tunnckoCore/koa-better-ratelimit>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

/**
 * Module dependencies.
 */

var ipchecker = require('ipchecker');

var defaults = {
  duration: 1000 * 60 * 60 * 24,
  whiteList: [],
  blackList: [],
  accessLimited: '429: Too Many Requests.',
  accessForbidden: '403: This is forbidden area for you.',
  max: 500,
  env: null
};

/**
 * With options through init you can control
 * black/white lists, limit per ip and reset interval.
 *
 * @param {Object} options
 * @api public
 */
module.exports = function betterlimit(options) {
  options = options || {};

  var db = {};

  for (var key in defaults) {
    if (!options[key]) { options[key] = defaults[key] }
  }

  if (options.message_429) {
    options.accessLimited = options.message_429;
  }

  if (options.message_403) {
    options.accessForbidden = options.message_403;
  }

  var whiteListMap = ipchecker.map(options.whiteList);
  var blackListMap = ipchecker.map(options.blackList);

  return async function ratelimit(ctx, next) {
    let ip = ctx.ip;
    if (typeof (options.id) == 'function') {
      ip = await options.id(ctx, next);
    }

    if (!ip) {
      return next();
    }
    if (ipchecker.check(ip, blackListMap)) {
      ctx.status = 403;
      ctx.body = options.accessForbidden;
      return;
    }
    if (ipchecker.check(ip, whiteListMap)) {
      return next();
    }

    var now = Date.now()
    var reset = now + options.duration;

    if (!db.hasOwnProperty(ip)) {
      db[ip] = { ip: ip, reset: reset, limit: options.max }
    }

    var delta = db[ip].reset - now
    var retryAfter = delta / 1000 | 0;

    db[ip].limit = db[ip].limit - 1
    ctx.response.set('X-RateLimit-Limit', options.max);

    if (db[ip].reset > now) {
      var rateLimiting = db[ip].limit < 0 ? 0 : db[ip].limit;
      ctx.response.set('X-RateLimit-Remaining', rateLimiting);
    }

    if (db[ip].limit < 0 && db[ip].reset < now) {
      db[ip] = { ip: ip, reset: reset, limit: options.max }
      db[ip].limit = db[ip].limit - 1;
      ctx.response.set('X-RateLimit-Remaining', db[ip].limit);
    }

    ctx.response.set('X-RateLimit-Reset', db[ip].reset);

    if (db[ip].limit < 0) {
      ctx.response.set('Retry-After', retryAfter);
      ctx.status = 429;
      ctx.body = options.accessLimited
      return;
    }

    return next();
  };
}
