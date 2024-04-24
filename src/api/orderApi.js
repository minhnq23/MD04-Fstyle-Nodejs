const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/api/orders", orderController.getAllOrders);
router.post("/api/orders/:id", orderController.createOrder);
router.get("/api/orders/:orderId", orderController.getOrderByOrderId);
router.put("/api/orders/:id", orderController.updateOrderStatus);
router.get("/api/orders/getbyuser/:userId", orderController.getOrdersByUserId);

module.exports = router;
