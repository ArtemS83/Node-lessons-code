const Joi = require('joi')

const schemaCreateCat = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  age: Joi.number().integer().min(1).max(45).required(),
  isVaccinated: Joi.boolean().optional(),
})

const schemaUpdateCat = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  age: Joi.number().integer().min(1).max(45).optional(),
  isVaccinated: Joi.boolean().optional(),
})

const schemaStatusVaccinatedCat = Joi.object({
  isVaccinated: Joi.boolean().required(),
})

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body)
    next()
  } catch (err) {
    next({ status: 400, message: `Field: ${err.message.replace(/"/g, '')}` })
  }
}

module.exports.validateCreateCat = (req, _res, next) => {
  return validate(schemaCreateCat, req.body, next)
}

module.exports.validateUpdateCat = (req, _res, next) => {
  return validate(schemaUpdateCat, req.body, next)
}
module.exports.validateStatusVaccinatedCat = (req, _res, next) => {
  return validate(schemaStatusVaccinatedCat, req.body, next)
}
