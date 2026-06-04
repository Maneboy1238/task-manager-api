const authSchema = require("../schema/auth.schema");
function isUserFieldValid(user) {
  const result = authSchema.safeParse(user);
  console.log(result.error);
  return result.success;
}
module.exports = isUserFieldValid;
