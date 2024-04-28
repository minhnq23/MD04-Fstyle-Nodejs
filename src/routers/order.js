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
router.get("/statistical", async (req, res) => {
  try {
    const orders = await Order.find();

    res.render("statistical", { orders });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error processing request");
  }
});
router.get("/user", async (req, res) => {
  try {
    const users = await User.find(); // Lấy tất cả người dùng từ MongoDB

    res.render("userManager", { users: users });
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi lấy danh sách người dùng");
  }
});

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

module.exports = router;
