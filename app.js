const express = require("express");
const mongoose = require("mongoose");
const app = express();
const user = require("./models/user");
const signInRouter = require("./src/routers/signIn");
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use("/", signInRouter);

const PORT = 3000;
const uri =
  "mongodb+srv://minhnq23:minh31223@cluster.u3ap31e.mongodb.net/?retryWrites=true&w=majority";
//
app.get("/", async (req, res) => {
  res.redirect("/signIn");
});

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
  await mongoose.connect(uri).then(console.log("connect mongoDb thanh cong"));
});
