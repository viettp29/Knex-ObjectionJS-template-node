const employeeService = require("../services/employee");

const createEmployee = async (req, res) => {
  const employee = await employeeService.createEmployee(req.body);
  res.status(200).json(employee);
};

const getAllEmployees = async (req, res) => {
  const employee = await employeeService.getAllEmployees();
  res.status(200).json(employee);
};

const getEmployeeByNumber = async (req, res) => {
  const employeeNumber = +req.params.employeeNumber;
  const employee = await getEmployeeByNumber(employeeNumber);
  return res.json(employee);
};

const updateEmployee = async (req, res) => {
  const employeeNumber = +req.params.employeeNumber;
  const employee = await updateEmployee(employeeNumber, req.body);
  return res.json(employee);
};
const deleteEmployee = async (req, res) => {
  const employeeNumber = +req.params.employeeNumber;
  const employee = await deleteEmployee(employeeNumber);
  return res.json(employee);
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeByNumber,
  updateEmployee,
  deleteEmployee,
};
