'use strict';
const k2c = require('koa2-connect');
const { createProxyMiddleware } = require('http-proxy-middleware');
const match = require('./match');

module.exports = function(options = {}) {
  return async function(ctx, next) {
    for (const context of Object.keys(options)) {
      if (match(context, ctx.path)) {
        const contextOptions = options[context];
        const { onProxyReq } = contextOptions;
        await k2c(createProxyMiddleware(context, {
          ...contextOptions,
          onProxyReq(proxyReq) {
            if (onProxyReq && typeof onProxyReq === 'function') {
              onProxyReq(proxyReq);
            }
            // reset rawBody after bodyparser
            const { rawBody, body: requestBody } = ctx.request;
            if (requestBody && rawBody) {
              proxyReq.setHeader('Content-Length', Buffer.byteLength(rawBody));
              proxyReq.write(rawBody);
              proxyReq.end();
            }
            return proxyReq;
          },
        }))(ctx, next);
      } else {
        await next();
      }
    }
  };
};
