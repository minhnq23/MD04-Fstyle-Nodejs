var admin = require("firebase-admin");

var serviceAccount = require("./firebase_adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const user = require("./src/models/user");
const signInRouter = require("./src/routers/signIn");
const userApi = require("./src/api/userApi");
const productsApi = require("./src/api/productApi");
const categoryApi = require("./src/api/categoryApi");
const favoritesApi = require("./src/api/favoriteApi");
const AddressApi = require("./src/api/addressApi");
const imageApi = require("./src/api/imageApi");
const cartApi = require("./src/api/cartApi");
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use("/", signInRouter);
app.use("/", userApi);
app.use("/", AddressApi);
app.use("/", categoryApi);
app.use("/", productsApi);
app.use("/", imageApi);
app.use("/", favoritesApi);
app.use("/", cartApi);

const PORT = 3000;
const uri =
  "mongodb+srv://minhnq23:minh31223@cluster.u3ap31e.mongodb.net/?retryWrites=true&w=majority";
app.get("/", async (req, res) => {
  res.redirect("/signIn");
});
// const registrationToken =
//   "eg9lMD6RTVC0DCFxXoRP7p:APA91bFHmDd-eYkvG0Ea1yR6rTLYba2FW8XqIKYEOX1PekB3r5nopDfJUMWdA-O8nD9rVPTnwoAEeLAf0UhD4DMVezcBLfNGqudsteLBSWaRNRA7jcqDTLC2xiOZMFC5dKHeLthJW2rn"; // replace with the actual device token

// const message = {
//   data: {
//     key1: "hihi",
//     key2: "haha",
//   },
//   token: registrationToken,
// };

// admin
//   .messaging()
//   .send(message)
//   .then((response) => {
//     console.log("Successfully sent message:", response);
//   })
//   .catch((error) => {
//     console.error("Error sending message:", error);
//   });

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
  await mongoose.connect(uri).then(console.log("connect mongoDb thanh cong"));
});
