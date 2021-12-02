const { Model } = require("objection");
const Employees = require("employees.model");

class Roles extends Model {
  static get tableName() {
    return "roles";
  }

  static get idColumn() {
    return "id";
  }

  static relationMappings = {
    relation: Model.HasManyRelation,
    modelClass: Employees,
    join: {
      from: "role.id",
      to: "employees.role",
    },
  };
}

module.exports = Roles;
