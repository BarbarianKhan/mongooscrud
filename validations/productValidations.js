const Joi = require('joi');

const ProductValidation = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
    sku:Joi.string().required(),
    price:Joi.number().required(),
    currency:Joi.string().required(),
    vendor_id:Joi.string().required(),
    make:Joi.string().required(),
    model:Joi.string().required()
});

module.exports= ProductValidation;