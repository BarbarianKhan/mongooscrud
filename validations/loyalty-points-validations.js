const Joi = require('joi');

const loyalPointValidator = Joi.object({
    notes: Joi.string().required().messages({
                                              'any.required': 'Notes is required'
                                            }),
    source: Joi.string().required().messages({
                                              'any.required': 'Source is required'
                                            }),
    status: Joi.string().email().required().messages({
                                              'any.required': 'Status is required'
                                            }),
    amount:Joi.number().required().min(0).max(100).messages({
                                              'any.required': 'Amount is required'
                                            }),
    points:Joi.number().required().min(0).max(100).messages({
                                              'any.required': 'Points is required'
                                            }),
    expiry_date: Joi.date().greater(new Date("1940-01-01")).required().messages({
                                              'any.required': 'Expiry Date is required'
                                            }),
    phoneNumber: Joi.string()
      .length(10)
      .pattern(/[6-9]{1}[0-9]{9}/)
      .required().messages({
        'any.required': 'Phone Number is required'
      }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")),
    confirmPassword: Joi.ref("password"),
  });

module.exports = loyalPointValidator;