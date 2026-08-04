const { Router } = require("express");
const { taskRouter} = require("./task.route");
const { authRouter} = require("./auth.route");

const router = Router();

router.use("/task", taskRouter);
router.use("/auth", authRouter);

module.exports = router