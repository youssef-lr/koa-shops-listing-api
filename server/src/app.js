const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');

const app = new Koa();
const PORT = process.env.PORT || 3000;

const authRoutes = require('./modules/auth/routes');
const shopRoutes = require('./modules/shop/routes');

app.use(bodyParser());

app.use((ctx, next) => next().catch((err) => {
  if (err.status === 401) {
    ctx.status = 401;
    ctx.body = 'Protected resource, use Authorization header to get access\n';
  } else {
    throw err;
  }
}));

app.use(jwt({ secret: 'secret' }).unless({ path: [/^\/auth/] }));

app.use(authRoutes.routes());
app.use(shopRoutes.routes());

const server = app.listen(PORT, () => {
  /* eslint-disable-next-line */
  console.log(`Server listening on port: ${PORT}`);
});


module.exports = server;
