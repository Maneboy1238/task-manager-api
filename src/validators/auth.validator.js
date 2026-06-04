const authSchema = require("../models/auth.model");
function isUserFieldValid(user) {
  console.log(authSchema);
  const result = authSchema.safeParse(user);
  console.log(result.error);
  return result.success;
}
module.exports = isUserFieldValid;
