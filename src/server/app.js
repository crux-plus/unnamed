// Authority node http serer package.
import http from 'http';

// Authority node path package.
import path from 'path';

// Expressive middleware for node.js using ES2017 async functions.
import Koa from 'koa';

// Realtime application framework (Node.JS server).
import socketIO from 'socket.io';

// A Koa view engine which renders React components on server.
import react from 'koa-react-view';

// Development style logger middleware for koa.
import logger from 'koa-logger';

// Compress middleware for koa.
import compress from 'koa-compress';

// koa session store with memory, redis or others.
import session from 'koa-generic-session';

// koa session with redis.
import redisStore from 'koa-redis';

// Terminal utilities for node.js.
import { terminal } from 'terminal-kit';

// compact zlib, deflate, inflate, zip library in JavaScript
import zlib from 'zlib';

// All custome routes.
import routers from 'server/routers';

import config from 'server/config';

const app = new Koa();

react(app, {
  // The root directory of view files.
  views: path.join(__dirname, 'views'),
});

app.use(logger());

app.use(session({
  // session store instance. It can be any Object that has
  // the methods set, get, destroy like MemoryStore.
  store: redisStore({
    // all node_redis options - Useful things include url,
    // host, port, and path to the server. Defaults to 127.0.0.1:6379
    host: config.redis.host,
    port: config.redis.port,
  }),
}));

app.use(compress({
  // Minimum response size in bytes to compress.
  // Default 1024 bytes or 1kb.
  threshold: config.compress.threshold,
  // Flush pending data. Don't call this frivolously, premature
  // flushes negatively impact the effectiveness of the compression algorithm.
  flush: zlib.Z_SYNC_FLUSH,
}));

app.use(routers.routes());

const server = http.createServer(app.callback());
const socket = socketIO(server);
server.listen(config.port, () => {
  terminal.blue(`Project is running at http://${config.host}:${config.port}/`);
});
