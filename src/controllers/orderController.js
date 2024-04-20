const express = require("express");
const Order = require("../models/orders");
const UserModel = require("../models/user");
var admin = require("firebase-admin");
exports.testApi = async () => {
  const registrationToken =
    "eVjVXMM7QdWcJvZQJP7_zl:APA91bH-4erSiU7_Z-pm0jApr-OCyegF-xmZ0Ftd97011Dgv6Kw4gZI7oCZUcVfsP-_7fEm6NIvnD9r8AoEJrkR9ds1fVcY25KXxqzdkxT0-l1MQiOXQyBOMSMwdGFy9AtjlAcqMO2p2";
  const message = {
    data: {
      key1: "Mã đơn hàng: ",
      key2: "Đơn hàng của quý khác đang chờ xác nhận \n  đm Thằng khoa béo ",
    },
    token: registrationToken,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
};

exports.createOrder = async (req, res) => {
  const idUser = req.params.id;
  const {
    address,
    listProduct,
    phone,
    paymentMethods,
    shippingMethod,
    status,
    totalPrice,
  } = req.body;

  // let totalPrice = 0;
  // for (const product of listProduct) {
  //   totalPrice += product.price * product.quantity;
  // }

  const newOrder = new Order({
    address,
    listProduct,
    idUser,
    phone,
    paymentMethods,
    shippingMethod,
    totalPrice,
    status,
  });
  let user = await UserModel.findById(idUser).lean();
  console.log("====================================");
  console.log("User: ", user);
  console.log("====================================");

  const registrationToken = user.tokenDevice + "";

  try {
    await newOrder.save();

    const message = {
      data: {
        key1: "Mã đơn hàng: " + newOrder._id,
        key2: "Đơn hàng của quý khác đang chờ xác nhận \n  đm Thằng khoa béo ",
      },
      token: registrationToken,
    };

    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });

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

exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      status: 200,
      message: "Order status updated successfully",
      order: order,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
exports.getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ idUser: userId });
    res.status(200).json({
      status: 200,
      message: "Orders retrieved successfully for user",
      orders: orders,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const sendNotifications = (req, res) => {
  const message = {
    data: {
      key1: "hihi",
      key2: "haha",
    },
    token: registrationToken,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
};
