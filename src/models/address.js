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
  stress: {
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
});
const AddressModel = mongoose.model("Address", AddressSchema);
module.exports = AddressModel;
