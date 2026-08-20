const express = require("express");
const { signupSchema, loginSchema } = require("../validators/auth.validator");
const { authValidationMiddleware, JWTVerificationMiddleware } = require("../middlewares/auth.middleware");
const { signupUsersHandler, loginUsersHandler, sendVerificationEmailHandler } = require("../controllers/auth.controller");
const { handleErrors, AppError } = require("../utils/error");

const router = express.Router();

router.post("/signup", authValidationMiddleware(signupSchema), signupUsersHandler);

router.post("/login", authValidationMiddleware(loginSchema), loginUsersHandler) 

router.post("/send-verification-email",JWTVerificationMiddleware, sendVerificationEmailHandler)

module.exports = router;
