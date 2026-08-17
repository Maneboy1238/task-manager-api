const express = require("express");
const { signupSchema, loginSchema } = require("../schema/auth.schema");
const authMiddleware = require("../middlewares/auth.middleware");
const { signupUsersHandler, loginUsersHandler } = require("../controllers/auth.controller");
const { handleErrors, AppError } = require("../utils/helpers");

const router = express.Router();

router.post("/signup", authMiddleware(signupSchema), signupUsersHandler);

router.post("/login", authMiddleware(loginSchema), loginUsersHandler) 

module.exports = router;
