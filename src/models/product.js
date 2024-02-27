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
    enum: ["Lazy shoes", "low-top shoes", "high neck shoes"],
    default: "Lazy shoes",
  },
  status: {
    type: String,
    enum: ["stocking", "out of stock"],
    default: "stocking",
  },
  description: { type: String },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
