const express = require("express");
const router = express.Router();
const Order = require("../models/orders");
const User = require("../models/user");
const mongoose = require("mongoose");

const validateObjectId = (req, res, next) => {
  const { orderId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).send("Invalid Order ID");
  }
  next();
};

router.get("/order", (req, res) => {
  res.render("order");
});

router.get("/:orderId", validateObjectId, async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).send("Order not found");
    }

    const user = await User.findById(order.idUser);
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("showdetailOder", { order, user });
  } catch (err) {
    console.error("Error retrieving order details:", err);
    res.status(500).send("Error retrieving order details");
  }
});

router.post("/:orderId/confirm", validateObjectId, async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = "active";
    await order.save();
    res
      .status(200)
      .json({ message: "Order confirmed successfully", order: order });
  } catch (error) {
    console.error("Error confirming order:", error);
    res.status(500).json({ message: "Error confirming order" });
  }
});

module.exports = router;
