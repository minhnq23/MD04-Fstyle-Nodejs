const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/api/products/products", productController.getProduct);
router.post("/api/products/products", productController.createProduct);
router.get("/api/products/update/:id", productController.updateProduct);

module.exports = router;
