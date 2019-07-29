## v2.1.2 / November 27, 2014
- bump to `jscs >= 1.8.0` and `jscs-doc >= 0.2.0`
- update semver range

## v2.1.1 / November 27, 2014
- fix code style collisions

## v2.1.0 / November 27, 2014
- enforce new code style
  - add jshint, jshintignore, jscs (using jscs-jsdoc)
  - normalizing all @tunnckoCore packages
  - add/edit dotfiles 
- option `message_429` deprecated, it will be remove in **v2.2.x**, use `accessLimited`
- option `message_403` deprecated, it will be remove in **v2.2.x**, use `accessForbidden`
- _>=v2.2.x jscs: "requireCamelCaseOrUpperCaseIdentifiers: true"_
- _>=v2.2.x jshint: "camelcase: true"_

## v2.0.1 / October 27, 2014
- typo in readme, `options.duration` is in milliseconds

## v2.0.0 / October 27, 2014
- remove `copy-to` dependency
- full rewrite
- fix wrong behaving - now works correctly
- MAY break someone's behaving

## v1.0.1 / October 25, 2014
- fix typos
- fix package.json

## v1.0.0 / October 25, 2014
- initial release



[npmjs-url]: http://npm.im/koa-better-ratelimit
[npmjs-shields]: http://img.shields.io/npm/v/koa-better-ratelimit.svg
[npmjs-install]: https://nodei.co/npm/koa-better-ratelimit.svg?mini=true

[coveralls-url]: https://coveralls.io/r/tunnckoCore/koa-better-ratelimit?branch=master
[coveralls-shields]: https://img.shields.io/coveralls/tunnckoCore/koa-better-ratelimit.svg

[license-url]: https://github.com/tunnckoCore/koa-better-ratelimit/blob/master/license.md
[license-img]: http://img.shields.io/badge/license-MIT-blue.svg

[travis-url]: https://travis-ci.org/tunnckoCore/koa-better-ratelimit
[travis-img]: https://travis-ci.org/tunnckoCore/koa-better-ratelimit.svg?branch=master

[depstat-url]: https://david-dm.org/tunnckoCore/koa-better-ratelimit
[depstat-img]: https://david-dm.org/tunnckoCore/koa-better-ratelimit.svg

[author-gittip-img]: http://img.shields.io/gittip/tunnckoCore.svg
[author-gittip]: https://www.gittip.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore

[author-website]: http://www.whistle-bg.tk
[author-npmjs]: https://npmjs.org/~tunnckocore

[koa-url]: https://github.com/koajs/koa