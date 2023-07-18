const Joi = require('joi');

const OrderValidation = Joi.object({
    name:Joi.string().required(),
    age:Joi.number().required(),
    company:Joi.string().required(),
    genre:Joi.string().required(),
    address:Joi.string().required(),
    phoneNumber:Joi.number().required()
});

module.exports= OrderValidation;