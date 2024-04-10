const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
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
      quantity: {
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
      imageDefault:{
        type: String,
      }

    },
  ],
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
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
    enum: ["active", "deactive","pending","trading","delivered"],
    default: "active",
    required: true,
  },
});

const OrderModel = mongoose.model("orders", orderSchema);
module.exports = OrderModel;
