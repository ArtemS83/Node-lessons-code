const Cats = require('../repository/cats')

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { cats, total, limit, offset } = await Cats.getAll(userId, req.query)
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { total, limit, offset, cats },
    })
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id
    const cat = await Cats.getById(userId, req.params.id)
    console.log(cat) // toObject
    if (cat) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { cat } }) // toJSON
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found cat by id' })
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const userId = req.user.id
    const cat = await Cats.create({ ...req.body, owner: userId })
    return res.status(201).json({ status: 'success', code: 201, data: { cat } })
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = 400
    }
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id
    const cat = await Cats.remove(userId, req.params.id)
    if (cat) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { cat } })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const userId = req.user.id
    const cat = await Cats.update(userId, req.params.id, req.body)
    if (cat) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { cat } })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
}
