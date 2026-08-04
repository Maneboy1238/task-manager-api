const express = require("express");
const routes = require("./routes/index");
const connectDb = require("./config/dbConnect");
const app = express();

app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

const PORT = process.env.PORT || 3000;
(async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
})();
