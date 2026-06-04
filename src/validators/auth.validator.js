function isUserFieldValid(schema, user) {
  const result = schema.safeParse(user);
  console.log(result);
  console.log(result.success);
  return result.success;
}
module.exports = isUserFieldValid;
