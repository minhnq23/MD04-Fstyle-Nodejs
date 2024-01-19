const express = require("express");
const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
const signInRouter = require("./src/routers/signIn");
app.use("/", signInRouter);

app.get("/", (req, res) => {
  res.redirect("/signIn");
});
// app.get("/signIn", (req, res) => {
//   const data = { username: "John" };
//   res.render("signIn", data);
// });

// app.get("/home", (req, res) => {
//   const data = { username: "John" };
//   res.render("home", data);
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
