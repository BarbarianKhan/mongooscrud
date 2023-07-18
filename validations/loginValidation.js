const Joi = require('joi');

const loginValidation = Joi.object({
    email:Joi.string().email().required(),
    phone:Joi.number().required()
});

module.exports= loginValidation;