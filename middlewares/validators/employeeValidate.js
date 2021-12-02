const { celebrate, Joi } = require("celebrate");

const jobTitles = ["PRESIDENT", "MANAGER", "LEADER", "STAFF"];

const employeeSchema = {
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  extension: Joi.string().max(10).required(),
  email: Joi.string().email().max(100).required(),
  officeCode: Joi.string().max(10).required(),
  reportsTo: Joi.number().positive().allow(null).optional(),
  jobTitle: Joi.string()
    .valid(...jobTitles)
    .required(),
};

const updateEmpSchema = {
  employeeNumber: Joi.number().positive().required(),
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  extension: Joi.string().max(10).required(),
  email: Joi.string().email().max(100).required(),
  officeCode: Joi.string().max(10).required(),
  reportsTo: Joi.number().positive().allow(null).optional(),
  jobTitle: Joi.string()
    .valid(...jobTitles)
    .required(),
};

const validateEmployee = celebrate(
  {
    params: Joi.object().keys({}),
    query: Joi.object().keys({}),
    body: Joi.object().keys(employeeSchema),
  },
  {
    abortEarly: false,
    convert: false,
    presence: "required",
    escapeHtml: true,
  }
);
const validateUpdateEmp = celebrate(
  {
    params: Joi.object().keys({}),
    query: Joi.object().keys({}),
    body: Joi.object().keys(updateEmpSchema),
  },
  {
    abortEarly: false,
    convert: false,
    presence: "required",
    escapeHtml: true,
  }
);

module.exports = {
  validateEmployee,
  validateUpdateEmp,
};
