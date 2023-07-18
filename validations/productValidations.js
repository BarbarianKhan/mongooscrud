const Joi = require('joi');

const ProductValidation = Joi.object({
    name:Joi.string().required(),
    age:Joi.number().required(),
    company:Joi.string().required(),
    genre:Joi.string().required(),
    address:Joi.string().required(),
    phoneNumber:Joi.number().required()
});

module.exports= ProductValidation;