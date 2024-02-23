const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/api/products/:id", productController.getProduct);
router.post("/api/products/post", productController.createProduct);
router.put(
  "/api/products/update/:id/:id_product",
  productController.updateProduct
);

module.exports = router;
