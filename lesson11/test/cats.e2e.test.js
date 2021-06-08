const request = require('supertest')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { newCat, newUser } = require('./data/data')
const app = require('../app')
const db = require('../model/db')
const Cat = require('../model/schemas/cat')
const User = require('../model/schemas/user')
const Users = require('../model/users')

describe('E2E test the routes api/cats', () => {
  let user, token

  beforeAll(async () => {
    await db
    await User.deleteOne({ email: newUser.email })
    user = await Users.create(newUser)
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
    const issueToken = (payload, secret) => jwt.sign(payload, secret)
    token = issueToken({ id: user._id }, JWT_SECRET_KEY)
    await Users.updateToken(user._id, token)
  })

  beforeEach(async () => {
    await Cat.deleteMany()
  })

  afterAll(async () => {
    const mongo = await db
    await User.deleteOne({ email: newUser.email })
    await mongo.disconnect()
  })

  describe('should handle get request', () => {
    it('should response 200 status for get all cats', async () => {
      const res = await request(app)
        .get('/api/cats')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.cats).toBeInstanceOf(Array)
    })
    it('should response 200 status for get cat by id', async () => {
      const cat = await Cat.create({ ...newCat, owner: user._id })
      const res = await request(app)
        .get(`/api/cats/${cat._id}`)
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.cat.id).toBe(String(cat._id))
    })
    it('should response 400 status for get cat by id', async () => {
      const res = await request(app)
        .get(`/api/cats/123`)
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
    })
  })
  describe('should handle post request', () => {
    it('should response 201 status create cat', async () => {
      const res = await request(app)
        .post('/api/cats')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send(newCat)

      expect(res.status).toEqual(201)
      expect(res.body).toBeDefined()
    })
    it('should response 400 status without required field age', async () => {
      const res = await request(app)
        .post('/api/cats')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ name: 'Toto' })

      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
    })
  })
  describe('should handle put request', () => {
    it('should response 200 status create cat', async () => {
      const cat = await Cat.create({ ...newCat, owner: user._id })
      const res = await request(app)
        .put(`/api/cats/${cat._id}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ name: 'Boris' })

      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.cat.name).toBe('Boris')
    })
  })
  describe('should handle delete request', () => {})
  describe('should handle patch request', () => {})
})
