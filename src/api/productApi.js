const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/api/products", productController.getAllProducts);
router.get("/api/products/:id", productController.getProduct);
router.post("/api/products", productController.createProduct);
router.put("/api/products/update/:id", productController.updateProduct);
router.delete("/api/products/delete/:id", productController.deleteProduct);
router.get("/api/get/productsById/:id", productController.getProductsById);
router.post("/purchase", productController.purchaseProduct);
router.get("/api/products/update/quantity/:id",productController.changeQuantity)
module.exports = router;
