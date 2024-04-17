const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.render("product", { products: products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Internal Server Error");
  }
  res.render("products");
});

module.exports = router;
