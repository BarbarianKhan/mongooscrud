const Joi = require('joi');

const OrderValidation = Joi.object({
    orderID:Joi.string().required(),
    currency:Joi.string().required(),
    totalAmount:Joi.number().required(),
    client_id:Joi.string().required(),
    status:Joi.string().required(),
    orderDate:Joi.date().required(),
    notes:Joi.string().required(),
    products:Joi.array().required(),    
    shippingAddress:Joi.object().required()
});

module.exports= OrderValidation;