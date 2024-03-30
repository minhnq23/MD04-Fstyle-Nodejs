const express = require("express");
const Order = require("../models/orders");

exports.createOrder = async (req, res) => {
  try {
    const { diaChi, tienHang, tenKhachHang, soLuong, tongTienHang, soDienThoai, phuongThucThanhToan, thoiGianDatHang, thoiGianNhanHang, thoiGianHuy, thoiGianDangGiao, trangThai } = req.body;

    const newOrder = new Order({
      diaChi,
      tienHang,
      tenKhachHang,
      soLuong,
      tongTienHang,
      soDienThoai,
      phuongThucThanhToan,
      thoiGianDatHang,
      thoiGianNhanHang,
      thoiGianHuy,
      thoiGianDangGiao,
      trangThai,
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

exports.getOrderByOrderId = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: "Order not found",
      });
    }
    res.status(200).json({
      status: 200,
      message: "Order retrieved successfully",
      order: order,
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
