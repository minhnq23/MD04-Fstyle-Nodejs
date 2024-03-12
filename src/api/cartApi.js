const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.put("/api/add/product/cart/:id_user", cartController.addCart);
router.get("/api/cart/:id_user", cartController.getCart);
router.get(
  "/api/del/cart/:id_user/:id_product",
  cartController.getCart
);
module.exports = router;
