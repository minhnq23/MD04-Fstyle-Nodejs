const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/api/products", productController.getAllProducts);
router.get("/api/products/:id", productController.getProduct);
router.post("/api/products", productController.createProduct);
router.put("/api/products/update/:id", productController.updateProduct);
router.delete("/api/products/delete/:id", productController.deleteProduct);

module.exports = router;
