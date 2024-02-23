const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/api/products", productController.getProduct);
router.get("/api/products/:id", productController.getProduct);
router.post("/api/products/post/:id", productController.createProduct);
router.get("/api/products/update/:id", productController.updateProduct);

module.exports = router;
