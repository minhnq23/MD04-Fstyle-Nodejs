const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  tienHang: {
    type: Number,
    required: true,
  },
  nameUser: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  paymentMethods: {
    type: String,
    enum: ["COD", "Sandbox"],
    default: "COD",
  },
  timeOrder: {
    type: Date,
    default: Date.now,
  },
  timeDelivery: {
    type: Date,
  },
  timeCancel: {
    type: Date,
  },
  thoiGianDangGiao: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
  },
});

const OrderModel = mongoose.model("orders", orderSchema);
module.exports = OrderModel;
