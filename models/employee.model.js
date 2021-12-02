const { Model } = require("objection");

class Employees extends Model {
  static get tableName() {
    return "employees";
  }
  static get idColumn() {
    return "employeeNumber";
  }
  static get relationMappings() {
    const Customers = require("customer.model");
    const Roles = require("role.model");
    return {
      customers: {
        relation: Model.HasManyRelation,
        modelClass: Customers,
        join: {
          from: "customers.salesRepEmployeeNumber",
          to: "employees.employeeNumber",
        },
      },
      permission: {
        relation: Model.BelongsToOneRelation,
        modelClass: Roles,
        join: {
          from: "employees.role",
          to: "role.id",
        },
      },
      superior: {
        relation: Model.HasManyRelation,
        modelClass: Employees,
        join: {
          from: "employees.employeeNumber",
          to: "employees.reportsTo",
        },
      },
    };
  }
}

module.exports = Employees;
