const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
  },
  idAddress: {
    type: mongoose.Schema.Types.ObjectId,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, default: 1 },
  created: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel = mongoose.model("orders", orderSchema);
module.exports = OrderModel;
