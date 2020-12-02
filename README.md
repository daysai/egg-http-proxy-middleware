# egg-http-proxy-middleware

> http-proxy-middleware for egg

[![NPM version](https://img.shields.io/npm/v/egg-http-proxy-middleware.svg?style=flat)](https://npmjs.org/package/egg-http-proxy-middleware)
[![NPM downloads](http://img.shields.io/npm/dm/egg-http-proxy-middleware.svg?style=flat)](https://npmjs.org/package/egg-http-proxy-middleware)
[![dependency Status](https://img.shields.io/david/daysai/egg-http-proxy-middleware.svg?style=flat-square)](https://david-dm.org/daysai/egg-http-proxy-middleware#info=dependencies)
[![dependency Status](https://snyk.io/test/npm/egg-http-proxy-middleware/badge.svg?style=flat-square)](https://snyk.io/test/npm/egg-http-proxy-middleware)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Use

```bash
npm i egg-http-proxy-middleware --save
```

### Register

```js
// {app_root}/app/middleware/proxy.js
'use strict';

module.exports = require('egg-http-proxy-middleware');
```

```js
// {app_root}/config/config.default.js
config.middleware = ['proxy'];
```

### Config

```js
// {app_root}/config/config.default.js
proxy: {
    '/api': {
        target: 'http://github.com/daysai',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '' },
    },
}
```
