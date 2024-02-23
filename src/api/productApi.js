const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Định tuyến các yêu cầu đến các hàm xử lý tương ứng trong productController
router.post("/api/products", productController.createProduct);
router.put("/api/products/:id", productController.updateProduct);
router.get("/api/products/:id", productController.getProduct);
router.get("/api/products", productController.getAllProducts);

module.exports = router;
