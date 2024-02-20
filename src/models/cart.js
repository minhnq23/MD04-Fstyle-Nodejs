const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  idUser: {
    type: "string",
    required: true,
    unique: true,
  },
  listProduct: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  total: {
    type: "number",
    default: true,
  },
});
const CartModel = mongoose.model("cart", CartSchema);
module.exports = CartModel;
