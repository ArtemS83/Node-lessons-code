const express = require('express')
const router = express.Router()
const Cats = require('../../model/cats')
const {
  validateCreateCat,
  validateStatusVaccinatedCat,
  validateUpdateCat,
} = require('./validation')

router.get('/', async (req, res, next) => {
  try {
    const cats = await Cats.getAll()
    return res
      .status(200)
      .json({ status: 'success', code: 200, data: { cats } })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
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
})

router.post('/', validateCreateCat, async (req, res, next) => {
  try {
    const cat = await Cats.create(req.body)
    return res.status(201).json({ status: 'success', code: 201, data: { cat } })
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = 400
    }
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
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
})

router.put('/:id', validateUpdateCat, async (req, res, next) => {
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
})

router.patch(
  '/:id/vaccinated',
  validateStatusVaccinatedCat,
  async (req, res, next) => {
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
  },
)

module.exports = router
