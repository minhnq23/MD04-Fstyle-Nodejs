const mongoose = require("mongoose");
const AddressSchema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
  },
  consigneeName: {
    type: String,
  },
  homeNumber: {
    type: String,
  },
  street: {
    type: String,
  },
  district: {
    type: String,
  },
  city: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
});
const AddressModel = mongoose.model("Address", AddressSchema);
module.exports = AddressModel;
