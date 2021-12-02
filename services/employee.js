const Employees = require("../models/employee.model");
const logger = require("../utils/logger");
const { AppError } = require("../middlewares/errors/index");

const getAllEmployees = async () => {
  const employees = await Employees.query().withGraphFetched("superior");
  if (employees) return employees;
  logger.error("Error @getAllEmployees");
  throw new AppError("Internal Server Error", 500);
};

const getEmployeeByNumber = async (employeeNumber) => {
  const employee = await Employees.query()
    .findById(employeeNumber)
    .withGraphFetched("superior");
  if (!employee) {
    logger.error("Error @getEmployeeByNumber");
    throw new AppError("Invalid employeeNumber", 400);
  }
  return employee;
};

const createEmployee = async (data) => {
  const employee = await Employees.query()
    .insertGraphAndFetch(data)
    .withGraphFetched("superior");
  if (employee) {
    return employee;
  }
  logger.error("Error @createEmployee");
  throw new AppError("Internal Server Error", 500);
};

const updateEmployee = async (employeeNumber, data) => {
  const result = await Employees.query()
    .patch(data)
    .where("employeeNumber", employeeNumber);
  if (!result) throw new AppError("Invalid employeeNumber", 400);
  const employee = await Employees.query()
    .findById(data.employeeNumber)
    .withGraphFetched("superior");
  if (employee) {
    return employee;
  }
  logger.error("Error @updateEmployee");
  throw new AppError("Internal Server Error", 500);
};

const deleteEmployee = async (employeeNumber) => {
  const result = await Employees.query().deleteById(employeeNumber);
  if (!result) {
    logger.error("Error @deleteEmployee");
    throw new AppError("Invalid employeeNumber", 400);
  }
  return {
    status: "success",
    message: `Successfully delete employee #${employeeNumber}`,
  };
};

module.exports = {
  getAllEmployees,
  getEmployeeByNumber,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
