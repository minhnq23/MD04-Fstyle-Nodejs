const mongoose = require("mongoose");
const Category = require("./category");

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
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: [Number],
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
  soldQuantity: {
    type: Number,
    default: 0,
  },

  isFavorite: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["Còn hàng", "Hết hàng"],
    default: "Còn hàng",
  },
  description: { type: String },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
