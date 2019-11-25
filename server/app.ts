/**
 * It is strongly suggested to reuse the graphql server, rather creating a new node server from scratch.
 */

import Koa, { Middleware } from 'koa';
import koaStatic from 'koa-static';
import logger from 'koa-logger';
import send from 'koa-send';
import mount from 'koa-mount';

const app = new Koa();

app.use(logger());
app.use(mount('/build', koaStatic(__dirname)) as Middleware);
app.use(ctx => ctx.url.includes('module-manifest.html') && send(ctx, 'module-manifest.html'));

app.listen(3000);
