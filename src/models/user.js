const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: "string",
    default: "Khoa wibu",
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
  },
  tokenDevice: {
    type: "string",
  },
  avatar: {
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
