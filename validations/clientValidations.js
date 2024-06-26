const Joi = require('joi');

const ClientValidation = Joi.object({
    name:Joi.string().required(),
    age:Joi.number().required(),
    company:Joi.string().required(),
    genre:Joi.string().required(),
    address:Joi.string().required(),
    phoneNumber:Joi.number().required(),
    category:Joi.string().required(),
    designation:Joi.string().required(),
    user_id:Joi.string().required()
});

module.exports= ClientValidation;