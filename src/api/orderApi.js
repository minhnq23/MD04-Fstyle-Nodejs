const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/api/orders", orderController.getAllOrders);
router.post("/api/orders", orderController.createOrder);
router.get("/api/orders/:orderId", orderController.getOrderByOrderId);
router.put("/api/orders/:id", orderController.updateOrderStatus); 

module.exports = router;
