const Cats = require('../model/cats')

const getAll = async (req, res, next) => {
  try {
    console.log(req.user)
    const cats = await Cats.getAll()
    return res
      .status(200)
      .json({ status: 'success', code: 200, data: { cats } })
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const cat = await Cats.getById(req.params.id)
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
    const cat = await Cats.create(req.body)
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
    const cat = await Cats.remove(req.params.id)
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
    const cat = await Cats.update(req.params.id, req.body)
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

// async (req, res, next) => {
//   try {
//     const cat = await Cats.update(req.params.id, req.body)
//     if (cat) {
//       return res
//         .status(200)
//         .json({ status: 'success', code: 200, data: { cat } })
//     }
//     return res
//       .status(404)
//       .json({ status: 'error', code: 404, message: 'Not Found' })
//   } catch (error) {
//     next(error)
//   }
// }

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
}
