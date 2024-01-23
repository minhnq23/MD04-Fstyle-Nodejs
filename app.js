const express = require("express");
const mongoose = require("mongoose");
const app = express();
const user = require("./models/user");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
const signInRouter = require("./src/routers/signIn");
app.use("/", signInRouter);

////////////////////////////////////////////////////////////////
const PORT = 3000;
const uri =
  "mongodb+srv://minhnq23:minh31223@cluster.u3ap31e.mongodb.net/?retryWrites=true&w=majority";
//
app.get("/", async (req, res) => {
  await mongoose.connect(uri).then(console.log("connect mongoDb thanh cong"));
  res.redirect("/signIn");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
