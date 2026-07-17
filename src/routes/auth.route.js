const express = require("express");
const bcrypt = require("bcrypt");
const { signupSchema, loginSchema } = require("../schema/auth.schema");
const authMiddleware = require("../middlewares/auth.middleware");
const { signupUsersHandler } = require("../controllers/auth.controller");
const { handleErrors, AppError } = require("../utils/helpers");
const users = require('../utils/constants')
const controller = require('../controllers/auth.controller')

const router = express.Router();

router.post("/signup", authMiddleware(signupSchema), signupUsersHandler);

router.post("/login", authMiddleware(loginSchema), controller.loginUsersHandler) 


router.get("/users", (req, res) => {
  res.json(users);
});
module.exports = router;
