import c2k = require('koa-connect');
import { createProxyMiddleware, Options as ContextOptions } from 'http-proxy-middleware';
import { match } from './match';

export interface Options {
  [contextName: string]: ContextOptions;
}

export default function (options: Options) {
  return async (ctx, next) => {
    for (const context of Object.keys(options)) {
      if (match(context, ctx.path)) {
        const contextOptions: ContextOptions = options[context];
        const { onProxyReq } = contextOptions;
        await c2k(
          createProxyMiddleware(context, {
            ...contextOptions,
            onProxyReq(proxyReq, req, res) {
              if (onProxyReq && typeof onProxyReq === 'function') {
                onProxyReq(proxyReq, req, res);
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
          }) as any
        )(ctx, next);
      }
    }
    await next();
  };
}
