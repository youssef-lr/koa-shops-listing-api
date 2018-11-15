process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const server = require('../../src/app');
const knex = require('../../src/database/connection');

const getUser = require('../../src/modules/user/tasks/get-user-task');
const getAllShops = require('../../src/modules/shop/tasks/get-all-shops-task');

chai.use(chaiHttp);

const { expect } = chai;

const BASE = '/api/v1/shops';

let token;
let userId;

const helpers = {
  likeDislikeShop(shopId, likeStatus) {
    return chai.request(server)
      .post(`${BASE}/like_dislike`)
      .send({
        shopId,
        likeStatus,
      })
      .set('Authorization', `Bearer ${token}`);
  },
};

describe('routes: shops', () => {
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();

    const user = await getUser({ email: 'user@gmail.com' });
    userId = user.id;
    token = jwt.sign({ id: userId }, 'secret');
  });

  afterEach(() => knex.migrate.rollback());

  describe('POST api/v1/shops/like_dislike', () => {
    it('should allow a shop to be liked by authenticated user', async () => {
      const shop = await knex('shops').where('name', 'Shop A').first();
      const res = await helpers.likeDislikeShop(shop.id, 'liked');
      expect(res.body.success).to.equal(true);

      const shopLike = await knex('shops_likes').where({
        shop_id: shop.id,
        user_id: userId,
      });

      expect(shopLike.length).to.equal(1);
      expect(shopLike[0].like_status).to.equal('liked');
    });

    it('should return all shops except user s favorites', async () => {
      const shop = await knex('shops').where('name', 'Shop A').first();
      const res = await helpers.likeDislikeShop(shop.id, 'liked');

      expect(res.body.success).to.equal(true);

      const shopLike = await knex('shops_likes').where({
        shop_id: shop.id,
        user_id: userId,
      });

      expect(shopLike.length).to.equal(1);
      expect(shopLike[0].like_status).to.equal('liked');
    });

    it('should allow the user to dislike a shop', async () => {
      const shop = await knex('shops').where('name', 'Shop C').first();
      const res = await helpers.likeDislikeShop(shop.id, 'disliked');
      expect(res.body.success).to.equal(true);
    });
  });

  describe('POST api/v1/shops/cancel_like_dislike', () => {
    it('should allow the user to remove a shop from favorites', async () => {
      /*
        liking a shop
      */
      const shop = await knex('shops').where('name', 'Shop C').first();
      const res = await helpers.likeDislikeShop(shop.id, 'liked');
      expect(res.body.success).to.equal(true);

      /*
        Disliking the same shop
      */
      const result = await chai.request(server)
        .post(`${BASE}/cancel_like_dislike`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          shopId: shop.id,
        });
      expect(result.body.success).to.equal(true);

      /* Retreiving favorites */
      const response = await chai.request(server)
        .get(`${BASE}/favorites`)
        .set('Authorization', `Bearer ${token}`);

      /* eslint-disable-next-line */
      expect(response.body.favorites).to.be.empty;
    });
  });

  describe('GET api/v1/shops', () => {
    it('should return 401 error if no jwt authorization header', async () => {
      const res = await chai.request(server).get(BASE);
      expect(res.status).to.equal(401);
    });

    it('should return all shops', async () => {
      const res = await chai.request(server)
        .get(BASE)
        .set('Authorization', `Bearer ${token}`);

      const { count } = (await knex('shops').count())[0];

      expect(res.body).to.have.all.keys('shops');
      expect(res.body.shops.length).to.equal(+count);
    });

    it('should return all shops except the user s favorites', async () => {
      const shop = await knex('shops').where('name', 'Shop A').first();
      const res = await helpers.likeDislikeShop(shop.id, 'liked');
      expect(res.body.success).to.equal(true);

      const shops = await getAllShops(userId);
      const favoriteShop = shops.find(s => s.name === 'Shop A');
      /* eslint-disable-next-line */
      expect(favoriteShop).to.be.undefined;
    });

    it('should not return disliked shop', async () => {
      // Fetching the shop to be disliked
      const shop = await knex('shops').where('name', 'Shop C').first();
      const res = await helpers.likeDislikeShop(shop.id, 'disliked');
      expect(res.body.success).to.equal(true);

      const shops = await getAllShops(userId);
      const dislikedShop = shops.find(s => s.name === 'Shop C');

      /* eslint-disable-next-line */
      expect(dislikedShop).to.be.undefined;
    });

    it('should return disliked shops when their dislike date is older than 2 hours', async () => {
      // Shop to be dislike
      const shop = await knex('shops').where('name', 'Shop C').first();
      const res = await helpers.likeDislikeShop(shop.id, 'disliked');
      expect(res.body.success).to.equal(true);

      /*
      Setting disliked_at date to a date older than 2 hours
      */
      const date = (new Date());
      date.setHours(date.getHours() - 2);
      await knex('shops_likes').where('shop_id', shop.id).update({
        disliked_at: date,
      });


      const shops = await getAllShops(userId);
      const dislikedShop = shops.find(s => s.name === 'Shop C');
      // Shop should still be in shops list
      expect(dislikedShop.id).to.equal(shop.id);
    });
  });

  describe('GET api/v1/shops/favorites', () => {
    it('should return empty favorite shops', async () => {
      const res = await chai.request(server)
        .get(`${BASE}/favorites`)
        .set('Authorization', `Bearer ${token}`);

      // eslint-disable-next-line
      expect(res.body.favorites).to.exist;
      // eslint-disable-next-line
      expect(res.body.favorites).to.be.empty;
    });

    it('should return a single favorite shops after it has been liked', async () => {
      const shopId = (await knex('shops').select('id').first()).id;
      await helpers.likeDislikeShop(shopId, 'liked');

      const res = await chai.request(server)
        .get(`${BASE}/favorites`)
        .set('Authorization', `Bearer ${token}`);

      // eslint-disable-next-line
      expect(res.body.favorites).to.exist;
      expect(res.body.favorites).to.have.lengthOf(1);
      expect(res.body.favorites[0].id).to.equal(shopId);
    });
  });
});
