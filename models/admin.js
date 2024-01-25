const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  username: {
    type: "string ",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  token: {
    type: "string",
  },
  status: {
    type: "Boolean",
    default: false,
  },
});
const AdminModel = mongoose.model("admin", AdminSchema);
module.exports = AdminModel;
