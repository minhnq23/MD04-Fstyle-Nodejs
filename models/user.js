const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: {
    type: "string",
  },
  password: { type: "string" },
  tokenDevice: { type: "string" },
});
const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
