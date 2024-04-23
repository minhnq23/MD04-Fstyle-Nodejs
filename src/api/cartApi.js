const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.put("/api/add/product/cart/:id_user", cartController.addCart);
router.get("/api/cart/:id_user", cartController.getCart);
router.get("/api/del/cart/:id_user/:id_product", cartController.removeProduct);
router.get(
  "/api/cart/product/reduce/:id_user/:id_product",
  cartController.reduce
);
router.get("/api/cart/reduce/:id_user/:id_product", cartController.reduce);
router.get("/api/cart/increase/:id_user/:id_product", cartController.increase);
router.get(
  "/api/cart/clear/order/:id_user/:id_product",
  cartController.clearProduct
);
module.exports = router;
