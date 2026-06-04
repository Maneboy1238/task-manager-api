const express = require("express");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middlewares/auth.middleware");
const { handleErrors, AppError } = require("../utils/helpers");

const router = express.Router();
const users = [];
const passwordExists = async (currentPassword, userPassword) => {
  const userPasswordExists = await bcrypt.compare(
    currentPassword,
    userPassword,
  );
  if (userPasswordExists) {
    return true;
  } else {
    throw new AppError({ message: "unauthorized", statusCode: 401 });
  }
};
router.post("/signup", authMiddleware, async (req, res) => {
  try {
    const { body } = req;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = {
      username: body.username,
      email: body.email,
      password: hashedPassword,
    };
    users.push(user);
    res.json(user);
  } catch (error) {
    handleErrors(res, error);
  }
});
router.post("/login", authMiddleware, async (req, res) => {
  try {
    const { body } = req;
    const user = users.find((user) => user.username === body.username);
    if (user) {
      await passwordExists(body.password, user.password);
      res.json({ message: "login successful" });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    handleErrors(res, error);
  }
});
router.get("/users", (req, res) => {
  res.json(users);
});
module.exports = router;
