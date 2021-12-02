const jwt = require("jsonwebtoken");
const { AppError } = require("./errors/index");
const auth = (roles) => {
  return function (req, res, next) {
    const secret = process.env.SECRET_KEY;
    const authorization = req.headers.authorization;
    if (authorization) {
      try {
        const token = authorization.replace("Bearer ", "");
        if (!token) {
          throw new AppError("Invalid token", 401);
        }
        const payload = jwt.verify(token, secret);
        if (payload) {
          res.locals.authenticated = payload;
          if (roles.includes(payload.role)) return next();
        }
        return res.status(403).send({ error: "Forbidden" });
      } catch (error) {
        return res.status(401).send({ error: error.message });
      }
    }
    return res.status(403).send({ error: "Forbidden" });
  };
};
module.exports = auth;
