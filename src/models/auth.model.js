const z = require("zod");

const authSchema = z.object({
  name: z.string(),
  password: z.string(),
});

module.exports = authSchema;
