const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/cats')
const guard = require('../../../helpers/guard')

const {
  validateCreateCat,
  validateStatusVaccinatedCat,
  validateUpdateCat,
  validateObjectId,
} = require('./validation')

router.get('/', guard, ctrl.getAll)

router.get('/:id', guard, validateObjectId, ctrl.getById)

router.post('/', guard, validateCreateCat, ctrl.create)

router.delete('/:id', guard, validateObjectId, ctrl.remove)

router.put('/:id', guard, validateObjectId, validateUpdateCat, ctrl.update)

router.patch(
  '/:id/vaccinated',
  guard,
  validateObjectId,
  validateStatusVaccinatedCat,
  ctrl.update,
)

module.exports = router
