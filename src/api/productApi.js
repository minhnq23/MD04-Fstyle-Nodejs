const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/api/products", productController.getAllProducts);
router.get("/api/products/:id", productController.getProduct);
router.post("/api/products", productController.createProduct);
router.put("/api/products/:id", productController.updateProduct);

module.exports = router;
