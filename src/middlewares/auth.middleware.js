const jwt = require("jsonwebtoken")
const isUserFieldValid = require("../validators/auth.validator");
function authValidationMiddleware(schema) {
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
function JWTVerificationMiddleware(req, res, next) {
  try {
  const accessToken = req.cookies.accessToken;
  const user = jwt.verify(accessToken, process.env.MY_SECRET);
  req.uid = user.uid;
  next()
  } catch(error) {
    console.log(error)
    res.clearCookie("accessToken");
    return res.sendStatus(401)
  }
}
module.exports = {
  authValidationMiddleware,
  JWTVerificationMiddleware
};
