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

var defaults = {
  duration: 1000 * 60 * 60 * 24,
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

  let db = {};

  for (let key in defaults) {
    if (!options[key]) { options[key] = defaults[key] }
  }

  if (options.message_429) {
    options.accessLimited = options.message_429;
  }

  if (options.message_403) {
    options.accessForbidden = options.message_403;
  }

  options.clear_interval = parseInt(options.clear_interval);
  if (options.clear_interval > 0) {
    setInterval(() => {
      let now = Date.now();
      for (let idx in db) {
        if (db[idx].reset < now) {
          delete db[idx];
        }
      }
    }, options.clear_interval);
  }

  return async function ratelimit(ctx, next) {
    let ip = ctx.ip;
    if (typeof (options.ip) == 'function') {
      ip = await options.ip(ctx);
    }

    if (!ip) {
      return next();
    }

    let now = Date.now()
    let reset = now + options.duration;

    if (!db.hasOwnProperty(ip)) {
      db[ip] = { ip: ip, reset: reset, limit: options.max }
    }

    let delta = db[ip].reset - now
    let retryAfter = delta / 1000 | 0;

    db[ip].limit = db[ip].limit - 1
    ctx.response.set('X-RateLimit-Limit', options.max);

    if (db[ip].reset > now) {
      let rateLimiting = db[ip].limit < 0 ? 0 : db[ip].limit;
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
