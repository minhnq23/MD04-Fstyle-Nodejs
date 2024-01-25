const express = require("express");
const mongoose = require("mongoose");
const app = express();
const user = require("./models/user");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
const signInRouter = require("./src/routers/signIn");
const loginRouter = require("./src/routers/login");

// app.use("/", signInRouter);
app.use("/", loginRouter);
app.use("/signIn", signInRouter);

<<<<<<< HEAD
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/signIn", (req, res) => {
=======
////////////////////////////////////////////////////////////////
const PORT = 3000;
const uri =
  "mongodb+srv://minhnq23:minh31223@cluster.u3ap31e.mongodb.net/?retryWrites=true&w=majority";
//
app.get("/", async (req, res) => {
  await mongoose.connect(uri).then(console.log("connect mongoDb thanh cong"));
>>>>>>> 1c599f6c9689c2d1a484a69445ac5869323c862c
  res.redirect("/signIn");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
