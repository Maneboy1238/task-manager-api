const express = require("express");
const { signupSchema, loginSchema, verifyEmailSchema, isUserFieldValid } = require("../validators/auth.validator");
const { authValidationMiddleware, JWTVerificationMiddleware } = require("../middlewares/auth.middleware");
const { signupUsersHandler, loginUsersHandler, sendVerificationEmailHandler, verifyEmailHandler } = require("../controllers/auth.controller");
const { handleErrors, AppError } = require("../utils/error");

const router = express.Router();

router.post("/signup", authValidationMiddleware(signupSchema), signupUsersHandler);

router.post("/login", authValidationMiddleware(loginSchema), loginUsersHandler) 

router.post("/send-verification-email",JWTVerificationMiddleware, sendVerificationEmailHandler)

router.get("/verify-email", (req, res, next) => {
    if(isUserFieldValid(verifyEmailSchema, {token: req.query.token})) {
        return next()
    } else {
        return res.sendStatus(400)
    }
}, JWTVerificationMiddleware, verifyEmailHandler)

module.exports = router;
