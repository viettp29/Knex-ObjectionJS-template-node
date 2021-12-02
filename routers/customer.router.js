const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");
const auth = require("../middlewares/authorization");
const { ROLES } = require("../utils/constances");
const { handleError } = require("../middlewares/errors/index");
const {
  validateCustomer,
  validateCustomerUpdate,
} = require("../middlewares/validators/customerValidate");
router
  .post(
    "/",
    auth([ROLES.PRESIDENT, ROLES.MANAGER, ROLES.LEADER, ROLES.STAFF]),
    validateCustomer,
    handleError(customerController.createCustomer)
  )
  .get(
    "/all",
    auth([ROLES.PRESIDENT, ROLES.MANAGER, ROLES.LEADER, ROLES.STAFF]),
    handleError(customerController.getAllCustomers)
  )
  .get(
    "/",
    auth([ROLES.PRESIDENT, ROLES.MANAGER, ROLES.LEADER, ROLES.STAFF]),
    handleError(customerController.getCustomerByNumber)
  )
  .put(
    "/",
    auth([ROLES.PRESIDENT, ROLES.MANAGER, ROLES.LEADER]),
    validateCustomerUpdate,
    handleError(customerController.updateCustomer)
  )
  .delete(
    "/",
    auth([ROLES.PRESIDENT, ROLES.MANAGER, ROLES.LEADER]),
    handleError(customerController.deleteCustomer)
  );
module.exports = router;
