const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
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
  emailTokenExpiresAt: {
    type: Date,
    default: null,
  }
})
const User = mongoose.model("User", userSchema);

module.exports = User;
