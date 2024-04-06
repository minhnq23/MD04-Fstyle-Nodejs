const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/api/orders", orderController.getAllOrders);
router.post("/api/orders", orderController.createOrder);
router.get("/api/orders/:orderId", orderController.getOrderByOrderId);
router.delete("/api/orders/:id", orderController.deleteOrder); 

module.exports = router;
