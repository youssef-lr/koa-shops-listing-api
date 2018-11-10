const Router = require('koa-router');
const authenticate = require('../controllers/authenticate');
const register = require('../controllers/register');

const router = new Router();

router.post('/auth/register', async (ctx) => {
  await register(ctx);
});

router.post('/auth', async (ctx) => {
  await authenticate(ctx);
});

module.exports = router;
