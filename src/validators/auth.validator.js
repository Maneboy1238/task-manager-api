function isUserFieldValid(schema, user) {
  const result = schema.safeParse(user);
  return result.success;
}
module.exports = isUserFieldValid;
