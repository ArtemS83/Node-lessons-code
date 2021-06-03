const { update } = require('../controllers/cats')
const Cats = require('../model/cats')

jest.mock('../model/cats')

describe('Unit test cats controllers', () => {
  const req = { user: { id: 1 }, body: {}, params: { id: 3 } }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((data) => data),
  }
  const next = jest.fn()

  it('without cat in Db', async () => {
    Cats.update = jest.fn()
    const result = await update(req, res, next)
    expect(result.status).toEqual('error')
    expect(result.code).toEqual(404)
    expect(result.message).toEqual('Not Found')
  })
  it('Db return an exception', async () => {
    Cats.update = jest.fn(() => {
      throw new Error('Ups')
    })
    await update(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})
