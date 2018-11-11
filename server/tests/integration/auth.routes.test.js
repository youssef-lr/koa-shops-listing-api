process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/app');
const knex = require('../../src/database/connection');

chai.use(chaiHttp);

const { expect } = chai;

describe('routes: auth', () => {
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterEach(() => knex.migrate.rollback());

  describe('POST /auth', () => {
    it('should return an error due to non existant email', async () => {
      const res = await chai.request(server).post('/auth')
        .send({
          email: 'fakeemail@gmail.com',
          password: 'hunter2',
        });

      expect(res.status).to.equal(400);
    });
  });

  describe('POST /auth', () => {
    it('should return jwt token when a valid user authenticates', async () => {
      const res = await chai.request(server)
        .post('/auth')
        .send({
          email: 'user@gmail.com',
          password: 'hunter2',
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.all.keys('token');
    });
  });

  describe('POST /auth/register', () => {
    it('should return an error due to invalid email & password when signing up', async () => {
      const res = await chai.request(server).post('/auth/register')
        .send({
          email: 'bademailgmail.com',
          password: 'hun2',
        });

      expect(res.body).to.have.all.keys('errors');
    });
  });

  describe('POST /auth/register', () => {
    it('should register a user with valid data', async () => {
      const res = await chai.request(server).post('/auth/register')
        .send({
          email: 'user2@gmail.com',
          password: 'hunter2',
        });

      expect(res.body).to.have.all.keys('user', 'token');
    });

    it('should not register a user with an existent email', async () => {
      const res = await chai.request(server).post('/auth/register')
        .send({
          email: 'user@gmail.com',
          password: 'hunter2',
        });

      expect(res.status).to.equal(422);
    });
  });
});
