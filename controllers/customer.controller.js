const customerService = require("../services/customer");

const createCustomer = async (req, res) => {
  const authenticated = res.locals.authenticated;
  if ([1, 2].includes(authenticated.role)) {
    const customer = await customerService.createCustomer(req.body);
    return res.json(customer);
  }
  const customer = await customerService.createCustomer(
    req.body,
    authenticated.employeeNumber
  );
  if (customer) return res.json(customer);
  res.status(500).json({ err: error.message });
};

const getAllCustomers = async (req, res) => {
  const authenticated = res.locals.authenticated;

  if ([1, 2].includes(authenticated.role)) {
    const customer = await customerService.getAllCustomers();
    return res.json(customer);
  }
  const customer = await customerService.getAllCustomers(
    authenticated.employeeNumber
  );
  if (customer) return res.json(customer);
  res.status(500).json({ err: error.message });
};

const getCustomerByNumber = async (req, res) => {
  const authenticated = res.locals.authenticated;
  const customerNumber = +req.params.customerNumber;

  if ([1, 2].includes(authenticated.role)) {
    const customer = await customerService.getCustomerByNumber(customerNumber);
    return res.json(customer);
  }

  const customer = await customerService.getCustomerByNumber(
    customerNumber,
    authenticated.employeeNumber
  );
  return res.json(customer);
};

const updateCustomer = async (req, res) => {
  const authenticated = res.locals.authenticated;
  const customerNumber = +req.params.customerNumber;

  if ([1, 2].includes(authenticated.role)) {
    const customer = await customerService.updateCustomer(
      customerNumber,
      req.body
    );
    return res.json(customer);
  }

  const customer = await customerService.updateCustomer(
    customerNumber,
    req.body,
    authenticated.employeeNumber
  );
  return res.json(customer);
};
const deleteCustomer = async (req, res) => {
  const authenticated = res.locals.authenticated;
  const customerNumber = +req.params.customerNumber;

  if ([1, 2].includes(authenticated.role)) {
    const customer = await customerService.deleteCustomer(customerNumber);
    return res.json(customer);
  }

  const customer = await customerService.deleteCustomer(
    customerNumber,
    authenticated.employeeNumber
  );
  return res.json(customer);
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerByNumber,
  updateCustomer,
  deleteCustomer,
};
