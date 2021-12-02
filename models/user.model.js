const { Model } = require("objection");

class Users extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "username";
  }

  static get relationMappings() {
    const Employees = require("employee.model");
    return {
      employee: {
        relation: Model.HasOneRelation,
        modeClass: Employees,
        join: {
          from: "users.employeeNumber",
          to: "employees.employeeNumber",
        },
      },
    };
  }
}

module.exports = Users;
