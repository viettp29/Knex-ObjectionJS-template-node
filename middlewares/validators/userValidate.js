const { celebrate, Joi } = require("celebrate");

const userSchema = {
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(6).max(100).required(),
  employeeNumber: Joi.number().required(),
};

const loginSchema = {
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(6).max(100).required(),
};

const validateUser = celebrate(
  {
    params: Joi.object().keys({}),
    query: Joi.object().keys({}),
    body: Joi.object().keys(userSchema),
  },
  {
    abortEarly: false,
    convert: false,
    presence: "required",
    escapeHtml: true,
  }
);
const validateLogin = celebrate(
  {
    params: Joi.object().keys({}),
    query: Joi.object().keys({}),
    body: Joi.object().keys(loginSchema),
  },
  {
    abortEarly: false,
    convert: false,
    presence: "required",
    escapeHtml: true,
  }
);
module.exports = { validateUser, validateLogin };
