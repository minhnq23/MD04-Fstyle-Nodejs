const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image64: {
    type: [String],
  },
  brand: {
    type: String,
    enum: ["Nike", "Adidas"],
    default: "Nike",
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  type: {
    type: String,
    enum: [
      "Giày chạy bộ",
      "Giày tối giản",
      "Giày đi bộ",
      "Giày tennis",
      "Giày tập luyện đa năng",
      "Giày chạy địa hình",
      "Giày cổ cao",
      "Giày sneaker",
    ],
    default: "Lazy shoes",
  },
  status: {
    type: String,
    enum: ["còn hàng", "hết hàng"],
    default: "stocking",
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  description: { type: String },
});

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
