const isUserFieldValid = require("../validators/auth.validator");
function authMiddleware(schema) {
  return (req , res, next) => {
  if (
    isUserFieldValid(schema, req.body)
  ) {
    return next();
  } else {
    return res.sendStatus(400);
  }
}
}
module.exports = authMiddleware;
