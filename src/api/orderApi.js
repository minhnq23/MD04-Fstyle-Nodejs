const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/api/orders", orderController.getAllOrders);
router.post("/api/orders", orderController.createOrder);
router.get("/api/orders/:id", orderController.getOrdersByUserId);
router.delete("/api/order/:id", orderController.deleteOrder);

module.exports = router;
