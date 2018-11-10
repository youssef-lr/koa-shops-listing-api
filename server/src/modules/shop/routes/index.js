const Router = require('koa-router');
const getAllShops = require('../controllers/get-all-shops');
const getFavorites = require('../controllers/get-favorites');
const likeDislike = require('../controllers/like-dislike-shop');

const router = new Router();
const BASE = '/api/v1/shops';

router.get(BASE, async (ctx) => {
  await getAllShops(ctx);
});

router.get(`${BASE}/favorites`, async (ctx) => {
  await getFavorites(ctx);
});

router.post(`${BASE}/like_dislike`, async (ctx) => {
  await likeDislike(ctx);
});


module.exports = router;
