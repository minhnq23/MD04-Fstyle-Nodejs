const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  listProduct: [
    {
      idProduct: {
        type: mongoose.Schema.Types.ObjectId,
      },
      name: {
        type: String,
        default: "Name Product",
      },
      soLuong: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        default: 0.0,
      },
      imageDefault: {
        type: String,
      },
    },
  ],
  totalCart: {
    type: Number,
    default: 0,
  },
});
const CartModel = mongoose.model("Cart", CartSchema);
module.exports = CartModel;
