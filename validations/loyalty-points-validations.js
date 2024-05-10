const Joi = require('joi');

const loyalPointValidator = Joi.object({
    notes: Joi.string().required().messages({
                                              'any.required': 'Notes is required'
                                            }),
    source: Joi.string().required().messages({
                                              'any.required': 'Source is required'
                                            }),
    status: Joi.string().required().messages({
                                              'any.required': 'Status is required'
                                            }),
    amount:Joi.number().required().min(0).messages({
                                              'any.required': 'Amount is required'
                                            }),
    points:Joi.number().required().min(0).messages({
                                              'any.required': 'Points is required'
                                            }),
    order_id:Joi.string().required().messages({
                                              'any.required': 'Order id is required'
                                            }),
    expiry_date: Joi.date().greater(new Date("1940-01-01")).required().messages({
                                              'any.required': 'Expiry Date is required'
                                            })
  });

module.exports = loyalPointValidator;