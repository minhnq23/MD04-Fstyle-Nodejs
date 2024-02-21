const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: "string",
  },
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
  },
  tokenDevice: {
    type: "string",
  },
  avatar: {
    type: "string",
  },
  address: {
    type: "string",
  },
  phone: {
    type: "string",
  },
  consigneeName: {
    type: "string",
  },
  isAdmin: {
    type: "boolean",
    default: false,
  },
});
const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
