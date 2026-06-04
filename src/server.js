const express = require("express");
const authRouter = require("./routes/auth.route");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use(authRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
