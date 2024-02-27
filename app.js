const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const user = require("./src/models/user");
const signInRouter = require("./src/routers/signIn");
const userApi = require("./src/api/userApi");
const productsApi = require("./src/api/productApi");
const AddressApi = require("./src/api/addressApi");
const imageApi = require("./src/api/imageApi");
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use("/", signInRouter);
app.use("/", userApi);
app.use("/", AddressApi);
app.use("/", productsApi);
app.use("/", imageApi);

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
