// init app express
import express from "express";
const app = express();
require("dotenv").config();
// import routes
const indexRouter = require("./routers/index.router");
const employee = require("./routers/employee.router");
const customer = require("./routers/customer.router");
const users = require("./routers/user.router");
// bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// use routers
app.use("/api/", indexRouter);
app.use("/api/employees", employee);
app.use("/api/customers", customer);
app.use("/api/users", users);

app.all("*", (req, res) => {
  return res.status(404).send({
    status: "error",
    message: `${req.originalUrl} not found.`,
  });
});
// import handler
const { errors } = require("celebrate");
const { handleErrors } = require("./middlewares/errors/index");

// listen server
const port = process.env.PORT;
const host = process.env.HOST;
app.get("/", (req, res) => {
  res.send("Xin chào các bạn mình là Knex đây !!!");
});

//  validate error
app.use(errors());
//  handle error
app.use(handleErrors);

app.listen(port, () => {
  console.log(`Server listening http://${host}:${port}`);
});
