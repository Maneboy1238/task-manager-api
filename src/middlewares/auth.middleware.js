const { signupSchema, loginSchema } = require("../schema/auth.schema");
const isUserFieldValid = require("../validators/auth.validator");
function authMiddleware(req, res, next) {
  const { originalUrl } = req;
  console.log(originalUrl);
  if (
    isUserFieldValid(
      originalUrl === "/signup" ? signupSchema : loginSchema,
      req.body,
    )
  ) {
    return next();
  } else {
    return res.sendStatus(400);
  }
}
module.exports = authMiddleware;
