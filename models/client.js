const mongoose = require("mongoose");
const ClientSchema = new mongoose.Schema({
  email: {
    type: "String",
    required: true,
    unique: true,
  },
  password: {
    type: "String",
    required: true,
  },
  username: {
    type: "String",
    required: true,
  },
  avatar: "String",
  isActive: {
    type: "Boolean",
    default: true,
  },
  token: "String",
  cart: {
    type: "Array",
  },
  address: {
    type: "String",
  },
  phoneNumber: {
    type: "String",
  },
  receiverName: {
    type: "String",
  },
  purchaseHistory: {
    type: "String",
  },
});
const ClientModel = mongoose.model("client", ClientSchema);
module.exports = ClientModel;
