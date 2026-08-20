const z = require("zod");
const mongoose = require('mongoose');
const { Schema } =mongoose;
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

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailToken: {
    type: String,
    default: null,
  },
  emailTokenExpiresIn: {
    type: Date,
    default: null,
  }
})
const User = mongoose.model("User", userSchema);

module.exports = {
  signupSchema,
  loginSchema,
  User
};
