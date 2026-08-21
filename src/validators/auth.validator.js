const z = require("zod");

const signupSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.email(),
  password: z.string(),
});

const loginSchema = z.object({
  username: z.union([z.string(), z.email()]),
  password: z.string(),
});

const verifyEmailSchema = z.object({
  token: z.string(),
})
function isUserFieldValid(schema, user) {
  const result = schema.safeParse(user);
  return result.success;
}
module.exports = {
  signupSchema,
  loginSchema,
  verifyEmailSchema,
  isUserFieldValid
};
