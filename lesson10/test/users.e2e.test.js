const request = require('supertest')
const { newTestUser } = require('./data/data')
const app = require('../app')
const db = require('../model/db')
const User = require('../model/schemas/user')
const Users = require('../model/users')
const fs = require('fs/promises')

jest.mock('cloudinary')

describe('E2E test the routes api/users', () => {
  let token

  beforeAll(async () => {
    await db
    await User.deleteOne({ email: newTestUser.email })
  })

  afterAll(async () => {
    const mongo = await db
    await User.deleteOne({ email: newTestUser.email })
    await mongo.disconnect()
  })

  it('should response 201 registration user', async () => {
    const res = await request(app).post('/api/users/register').send(newTestUser)
    expect(res.status).toEqual(201)
    expect(res.body).toBeDefined()
  })

  it('should response 409 registration user', async () => {
    const res = await request(app).post('/api/users/register').send(newTestUser)
    expect(res.status).toEqual(409)
    expect(res.body).toBeDefined()
  })

  it('should response 200 login user', async () => {
    const res = await request(app).post('/api/users/login').send(newTestUser)
    expect(res.status).toEqual(200)
    expect(res.body).toBeDefined()
    token = res.body.data.token
  })

  it('should response 401 login user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'fake@test.com', password: '12345' })

    expect(res.status).toEqual(401)
    expect(res.body).toBeDefined()
  })

  it('should response 200 upload avatar user', async () => {
    const buf = await fs.readFile('./test/data/default-avatar-female.jpg')

    const res = await request(app)
      .patch('/api/users/avatars')
      .set('Authorization', `Bearer ${token}`)
      .attach('avatar', buf, 'default-avatar-female.jpg')

    expect(res.status).toEqual(200)
    expect(res.body).toBeDefined()
    expect(res.body.data.avatarUrl).toBe('avatar')
  })
})
