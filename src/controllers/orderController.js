const express = require("express");
const Product = require("../models/product");
const UserModel = require("../models/user");
const Order = require("../models/orders");

exports.createOrder = async (req, res) => {
  try {
    const { idUser, idAddress, product, quantity, created } = req.body;
    const user = await UserModel.findById(idUser);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }

    const newOrder = new Order({
      idUser,
      idAddress,
      product,
      quantity,
      created,
    });

    await newOrder.save();

    res.status(201).json({
      status: 201,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      status: 200,
      message: "All orders retrieved successfully",
      orders: orders,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
exports.getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    const orders = await Order.find({ idUser: userId });

    res.status(200).json({
      status: 200,
      message: "Orders retrieved successfully for user with ID " + userId,
      orders: orders,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: "Order not found",
      });
    }

    await order.remove();

    res.status(200).json({
      status: 200,
      message: "Order deleted successfully",
      order: order,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
