const isUserFieldValid = require("../validators/auth.validator");

function AuthMiddleware(req, res, next) {
  if (isUserFieldValid(req.body)) {
    next();
  } else {
    res.sendStatus(400);
  }
}
module.exports = AuthMiddleware;
