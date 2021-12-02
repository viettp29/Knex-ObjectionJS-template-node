require("dotenv").config();
module.exports = {
  deverlopment: {
    client: "mysql",
    connection: {
      host: process.env.HOST,
      port: process.env.PORT,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    },
    pool: {
      min: 0,
      max: 10,
    },
    debug: true,
  },
};
