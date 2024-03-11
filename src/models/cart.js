const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  items: [
    {
      idProduct: {
        type: mongoose.Schema.Types.ObjectId,
      },
      name: {
        type: String,
        default: "Name Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        default: 0.0,
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
