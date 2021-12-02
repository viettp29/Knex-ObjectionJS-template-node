const userService = require("../services/user");
const register = async (req, res) => {
  const user = await userService.register(req.body);
  return res.json(user);
};

const login = async (req, res) => {
  const token = await userService.login(req.body);
  return res.status(200).json(token);
};

module.exports = { register, login };
