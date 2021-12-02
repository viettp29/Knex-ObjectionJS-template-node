const { Model } = require("objection");

class Customers extends Model {
  // lấy tên bảng
  static get tableName() {
    return "customers";
  }

  // lấy khoá chính
  static get idColumn() {
    return "customerNumber";
  }

  // validate khi mỗi instance đc tạo
  //   static get jsonSchema() {
  //     return {
  //       type: "object",
  //       required: [
  //         "customerNumber",
  //         "customerName",
  //         "contactLastName",
  //         "contactFirstName",
  //         "phone",
  //         "addressLine1",
  //         "city",
  //         "country",
  //         "salesRepEmployeeNumber",
  //       ],
  //       properties: {
  //         customerNumber: { type: "integer", minimum: 1 },
  //         customerName: { type: "string", minLength: 5, maxLength: 50 },
  //         contactLastName: { type: "string", minLength: 3, maxLength: 50 },
  //         contactFirstName: { type: "string", minLength: 3, maxLength: 50 },
  //         phone: { type: "string", minLength: 8, maxLength: 20 },
  //         addressLine1: { type: "string", minLength: 10, maxLength: 50 },
  //         addressLine2: {
  //           type: ["string", "null"],
  //           minLength: 10,
  //           maxLength: 50,
  //         },
  //         city: { type: "string", minLength: 2, maxLength: 50 },
  //         state: { type: ["string", "null"], minLength: 2, maxLength: 50 },
  //         postalCode: { type: ["string", "null"], minLength: 5, maxLength: 15 },
  //         country: { type: "string", minLength: 2, maxLength: 50 },
  //         salesRepEmployeeNumber: { type: ["integer", "null"], minimum: 1 },
  //         creditLimit: {
  //           type: ["number", "null"],
  //           minimum: 0,
  //           maximum: 10000000000,
  //         },
  //       },
  //     };
  //   }

  // định nghĩa quan hệ của modelClass
  static get relationMappings() {
    const Employees = require("./employees");
    return {
      // tên quan hệ
      salesRep: {
        // kiểu quan hệ
        relation: Model.BelongsToOneRelation,
        // model đc quan hệ
        modelClass: Employees,
        join: {
          from: "customers.salesRepEmployeeNumber",
          to: "employees.employeeNumber",
        },
      },
    };
  }
}
module.exports = {
  Customers,
};
