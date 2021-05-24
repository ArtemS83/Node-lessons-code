const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/cats')
const guard = require('../../../helpers/guard')

const {
  validateCreateCat,
  validateStatusVaccinatedCat,
  validateUpdateCat,
} = require('./validation')

router.get('/', guard, ctrl.getAll)

router.get('/:id', guard, ctrl.getById)

router.post('/', guard, validateCreateCat, ctrl.create)

router.delete('/:id', guard, ctrl.remove)

router.put('/:id', guard, validateUpdateCat, ctrl.update)

router.patch('/:id/vaccinated', guard, validateStatusVaccinatedCat, ctrl.update)

module.exports = router
