const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
  },
  listProduct: [
    {
      idProduct: {
        type: String,
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
      size: {
        type: String,
      },
      imageDefault: {
        type: String,
      },
    },
  ],
  totalProduct:{
    type: Number,
    default: 0,
  },
  totalCart: {
    type: Number,
    default: 0,
  },
});
const CartModel = mongoose.model("carts", CartSchema);
module.exports = CartModel;
