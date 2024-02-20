const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
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
  status: {
    type: "String",
    enum: ["still", "run out of"],
    default: "still",
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
