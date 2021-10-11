const joi = require('joi')

const validator = (req, res, next) => {
  const schema = joi.object({
    firstName: joi
      .string()
      .trim()
      .pattern(/\p{L}+$/u)
      .required()
      .messages({
        'string.empty': 'First name field must be completed',
        'string.pattern.base': 'First name field must not contain numbers',
        'string.min': 'First name must be at least 2 characters long',
      }),
    lastName: joi
      .string()
      .trim()
      .pattern(/\p{L}+$/u)
      .required()
      .messages({
        'string.empty': 'Last name field must be completed',
        'string.pattern.base': 'Last name field must not contain numbers',
        'string.min': 'Last name must be at least 2 characters long',
      }),
    email: joi
      .string()
      .trim()
      .email({ tlds: { allow: false } })
      .messages({
        'string.empty': 'Email cant be empty',
        'string.base': 'The email must be of type text',
        'string.email': 'The email is invalid',
      }),
    password: joi.string().trim().min(8).required().messages({
      'string.empty': 'The field cant be empty',
      'string.base': 'The password must be of type text',
      'string.min': 'Password must contain at least 8 characters',
    }),
    google: joi.boolean(),
    fileImg: joi.string(),
  })
  const validation = schema.validate(req.body, { abortEarly: false })
  if (!validation.error) {
    next()
  } else {
    res.json({
      error: validation.error.details.map((error) => {
        return { field: error.context.key, message: error.message }
      }),
    })
  }
}
module.exports = validator
