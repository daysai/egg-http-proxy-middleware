# egg-http-proxy-middleware

http-proxy-middleware for egg

## Use

```bash
npm i egg-http-proxy-middleware --save
```

### Register

```js
// {app_root}/middleware/proxy.js
'use strict';

module.exports = require('egg-http-proxy-middleware');
```

```js
// {app_root}/config/config.default.js
config.middleware = [ 'proxy' ];
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
