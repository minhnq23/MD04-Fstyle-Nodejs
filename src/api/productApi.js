const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/api/products", productController.createProduct);
router.put("/api/products/:id", productController.updateProduct);
router.get("/api/products/get", productController.getAllProducts);
router.get("/api/products/get/:id", productController.getProduct);
module.exports = router;
