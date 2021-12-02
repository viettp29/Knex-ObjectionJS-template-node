const { celebrate, Joi } = require("celebrate");

const customerSchema = {
  customerName: Joi.string().min(5).max(50).required(),
  contactLastName: Joi.string().min(3).max(50).required(),
  contactFirstName: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(8).max(20).required(),
  addressLine1: Joi.string().min(10).max(50).required(),
  addressLine2: Joi.string().min(10).max(50).optional().allow(null),
  city: Joi.string().min(2).max(50).required(),
  state: Joi.string().min(2).max(50).optional().allow(null),
  postalCode: Joi.string().min(5).max(15).optional().allow(null),
  country: Joi.string().min(2).max(50).required(),
  salesRepEmployeeNumber: Joi.number().allow(null).required(),
  creditLimit: Joi.number(),
};
const customerUpdateSchema = {
  customerNumber: Joi.number().positive().required(),
  customerName: Joi.string().min(5).max(50).required(),
  contactLastName: Joi.string().min(3).max(50).required(),
  contactFirstName: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(8).max(20).required(),
  addressLine1: Joi.string().min(10).max(50).required(),
  addressLine2: Joi.string().min(10).max(50).optional().allow(null),
  city: Joi.string().min(2).max(50).required(),
  state: Joi.string().min(2).max(50).optional().allow(null),
  postalCode: Joi.string().min(5).max(15).optional().allow(null),
  country: Joi.string().min(2).max(50).required(),
  salesRepEmployeeNumber: Joi.number().allow(null).required(),
  creditLimit: Joi.number(),
};

const validateCustomer = celebrate(
  {
    params: Joi.object().keys({}),
    query: Joi.object().keys({}),
    body: Joi.object().keys(customerSchema),
  },
  {
    abortEarly: false,
    convert: false,
    presence: "required",
    escapeHtml: true,
  }
);
const validateCustomerUpdate = celebrate(
  {
    params: Joi.object().keys({}),
    query: Joi.object().keys({}),
    body: Joi.object().keys(customerUpdateSchema),
  },
  {
    abortEarly: false,
    convert: false,
    presence: "required",
    escapeHtml: true,
  }
);

module.exports = { validateCustomer, validateCustomerUpdate };
