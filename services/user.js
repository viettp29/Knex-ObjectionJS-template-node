const Users = require("../models/user.model");
const logger = require("../utils/logger");
const { AppError } = require("../middlewares/errors/index");

const register = async (body) => {
  body.password = await hassPassword(body.password);
  const user = await Users.query().insert(body);
  if (user) {
    return user;
  }
  logger.error("Error @createUser");
  throw new AppError("User creation failure", 500);
};

async function getUserByUsername(username) {
  const user = await Users.query()
    .findById(username)
    .select(["username", "password"])
    .withGraphFetched("employees");
  if (user) {
    return user;
  }
  logger.error("Error @getUserByUsername");
  throw new AppError(`Cannot find user ${username}`);
}

const login = async (data) => {
  const user = await getUserByUsername(data.username);

  if (!user) throw new AppError("Invalid username", 400);

  const isPwValid = await checkPassword(data.password, user.password);

  if (isPwValid) {
    logger.info(`User ${data.username} has logged in`);
    const token = generateToken(user);
    return { status: "success", token };
  }
  throw new AppError("Invalid password", 400);
};

const generateToken = (user) => {
  const { employeeNumber, officeCode, role } = user.employees;
  return jwt.sign(
    { employeeNumber, officeCode, role },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
};

const hassPassword = async (password) => {
  const salt = await bcrypt.genSalt(+process.env.SALT);
  const hassPw = await bcrypt.hash(password, salt);
  return hassPw;
};

const checkPassword = async (password, hassPw) => {
  return await bcrypt.compare(password, hassPw);
};
module.exports = {
  register,
  getUserByUsername,
  login,
};
