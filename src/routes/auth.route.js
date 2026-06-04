const express = require("express");
const bcrypt = require("bcrypt");
const AuthMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();
const users = [];

router.use(AuthMiddleware);

router.post("/signup", AuthMiddleware, async (req, res) => {
  try {
    const { body } = req;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = {
      name: body.name,
      password: hashedPassword,
    };
    users.push(user);
    res.json(users);
  } catch (error) {
    res.sendStatus(500);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { body } = req;
    const user = users.find((user) => user.name === body.name);
    if (user) {
      if (await bcrypt.compare(body.password, user.password)) {
        res.send("login successful");
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
    console.log(error.message);
  }
});
router.get("/users", (req, res) => {
  res.json(users);
});
module.exports = router;
