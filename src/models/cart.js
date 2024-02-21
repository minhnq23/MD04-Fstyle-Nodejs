const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  idUser: {
    type: String,
    required: true,
    unique: true,
  },
  listProduct: [
    {
      idProduct: {
        type: mongoose.Schema.Types.ObjectId,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
});
const CartModel = mongoose.model("Cart", CartSchema);
module.exports = CartModel;
