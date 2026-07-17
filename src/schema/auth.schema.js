const z = require("zod");

const signupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.email(),
  password: z.string(),
});

const loginSchema = z.object({
  username: z.union([z.string(), z.email()]),
  password: z.string(),
});

module.exports = {
  signupSchema,
  loginSchema,
};
