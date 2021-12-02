const Customers = require("../models/customer.model");
const Employees = require("../models/employee.model");

// Logger
const logger = require("../utils/logger");

// Error creator
const { AppError } = require("../middlewares/errors/index");

const getAllCustomers = async (employeeNumber) => {
  if (!employeeNumber) {
    const customers = await Customers.query().withGraphFetched("salesRep");
    return customers;
  }

  const customers = await Customers.query()
    .whereIn(
      "salesRepEmployeeNumber",
      Employees.query()
        .select("employeeNumber")
        .where("reportsTo", employeeNumber)
        .orWhere("employeeNumber", employeeNumber)
    )
    .withGraphFetched("salesRep");
  if (customers) {
    return customers;
  }
  logger.error("Error @getAllCustomers");
  throw new AppError("Internal Server Error", 500);
};

const getCustomerByNumber = async (customerNumber, employeeNumber) => {
  if (!employeeNumber) {
    const customer = await Customers.query()
      .findById(customerNumber)
      .withGraphFetched("salesRep");
    console.log(customer);
    if (!customer) throw new AppError("Invalid customerNumber", 400);
    return customer;
  }

  const customer = await Customers.query()
    .findById(customerNumber)
    .whereIn(
      "salesRepEmployeeNumber",
      Employees.query()
        .select("employeeNumber")
        .where("reportsTo", employeeNumber)
        .orWhere("employeeNumber", employeeNumber)
    )
    .withGraphFetched("salesRep");
  if (!customer) {
    logger.error("Error @getCustomerByNumber");
    throw new AppError("Forbidden", 403);
  }
  return customer;
};

const createCustomer = async (data, employeeNumber) => {
  if (!employeeNumber) {
    const customer = await Customers.query()
      .insertAndFetch(data)
      .withGraphFetched("salesRep");
    return customer;
  }

  const allowedSalesRep = await Employees.query()
    .select("employeeNumber")
    .where("employeeNumber", employeeNumber)
    .orWhere("reportsTo", employeeNumber);

  const listOfSalesRep = allowedSalesRep.map((sale) => sale.employeeNumber);

  if (listOfSalesRep.includes(data.salesRepEmployeeNumber)) {
    const customer = await Customers.query()
      .insertAndFetch(data)
      .withGraphFetched("salesRep");
    if (customer) return customer;
  }
  logger.error("Error @createCustomer");
  throw new AppError("Forbidden", 403);
};

const updateCustomer = async (customerNumber, data, employeeNumber) => {
  if (!employeeNumber) {
    const result = await Customers.query()
      .patch(data)
      .where("customerNumber", customerNumber);
    if (!result) throw new AppError("Invalid customerNumber", 400);
    const customer = await Customers.query()
      .findById(data.customerNumber)
      .withGraphFetched("salesRep");
    return customer;
  }

  const target = await Customers.query().findById(customerNumber);

  const allowedSalesRep = await Employees.query()
    .select("employeeNumber")
    .where("employeeNumber", employeeNumber)
    .orWhere("reportsTo", employeeNumber);

  const listOfSalesRep = allowedSalesRep.map((sale) => sale.employeeNumber);

  if (listOfSalesRep.includes(target.salesRepEmployeeNumber)) {
    const result = await Customers.query()
      .patch(data)
      .where("customerNumber", customerNumber);
    if (!result) throw new AppError("Invalid customerNumber", 400);
    const customer = await Customers.query()
      .findById(data.customerNumber)
      .withGraphFetched("salesRep");
    return customer;
  }
  logger.error("Error @updateCustomer");
  throw new AppError("Forbidden", 403);
};

const deleteCustomer = async (customerNumber, employeeNumber) => {
  if (!employeeNumber) {
    const result = await Customers.query().deleteById(customerNumber);
    if (!result) throw new AppError("Invalid customerNumber", 400);
    return {
      status: "success",
      message: `Successfully delete customer #${customerNumber}`,
    };
  }

  const target = await Customers.query().findById(customerNumber);

  if (!target) throw new AppError("Invalid customerNumber", 400);

  const allowedSalesRep = await Employees.query()
    .select("employeeNumber")
    .where("employeeNumber", employeeNumber)
    .orWhere("reportsTo", employeeNumber);

  const listOfSalesRep = allowedSalesRep.map((sale) => sale.employeeNumber);

  if (listOfSalesRep.includes(target.salesRepEmployeeNumber)) {
    const result = await Customers.query().deleteById(customerNumber);
    if (!result) throw new AppError("Invalid customerNumber", 400);
    return {
      status: "success",
      message: `Successfully delete customer #${customerNumber}`,
    };
  }
  logger.error("Error @deleteCustomer");
  throw new AppError("Forbidden", 403);
};

module.exports = {
  getAllCustomers,
  getCustomerByNumber,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
