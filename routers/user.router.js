const express = require("express");
const router = express.Router();
const userController = require("../services/user.js");
const auth = require("../middlewares/authorization");
const { handleError } = require("../middlewares/errors/index");
const { ROLES } = require("../utils/constances");
const {
  validateUser,
  validateLogin,
} = require("../middlewares/validators/userValidate");

router
  .post("/register", validateUser, handleError(userController.register))
  .post("/login", validateLogin, handleError(userController.login))
  .get(
    "/",
    auth([ROLES.PRESIDENT, ROLES.LEADER, ROLES.MANAGER]),
    handleError(userController.getUserByUsername)
  );

module.exports = router;
