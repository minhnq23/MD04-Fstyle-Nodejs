const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  image64: {
    type: [String],
  },
  brand: {
    type: "String",
    enum: ["Nike", "Adidas"],
    default: "Nike",
  },
  price: {
    type: "Number",
    required: true,
  },
  size: {
    type: "Number",
    required: true,
  },
  color: {
    type: "String",
    required: true,
  },
  quantity: {
    type: "Number",
    required: true,
    default: 0,
  },
  type: {
    type: "String",
    enum: ["Lazy shoes", "low-top shoes", "high neck shoes"],
    default: "Lazy shoes",
  },
  description: "String",
});
const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;
