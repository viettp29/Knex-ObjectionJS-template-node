const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller");
const auth = require("../middlewares/authorization");
const { ROLES } = require("../utils/constances");
const { handleError } = require("../middlewares/errors/index");
const {
  validateEmployee,
  validateUpdateEmp,
} = require("../middlewares/validators/employeeValidate");
router
  .post(
    "/",
    auth([ROLES.PRESIDENT, ROLES.MANAGER]),
    validateEmployee,
    handleError(employeeController.createEmployee)
  )
  .get(
    "/all",
    auth([ROLES.PRESIDENT, ROLES.MANAGER, ROLES.LEADER]),
    handleError(employeeController.getAllEmployees)
  )
  .get(
    "/",
    auth([ROLES.PRESIDENT, ROLES.MANAGER]),
    handleError(employeeController.getEmployeeByNumber)
  )
  .put(
    "/",
    auth([ROLES.PRESIDENT, ROLES.MANAGER]),
    validateUpdateEmp,
    handleError(employeeController.updateEmployee)
  )
  .delete(
    "/",
    auth([ROLES.PRESIDENT]),
    handleError(employeeController.deleteEmployee)
  );

module.exports = router;
