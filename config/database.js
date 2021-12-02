const { Model } = require("objection");
require("dotenv").config();
// nếu là server sản phẩm thì để trong NDOE_ENV nếu khong phải thì là development
const environment = process.env.NODE_ENV || "development";
const config = require("./knexfile.js")[environment];

const knex = require("knex")(config);

// knex.raw("SELECT VERSION()").then(() => {
//   console.log("Connect to DB successfully!");
// });
Model.knex(knex);

module.exports = knex;
