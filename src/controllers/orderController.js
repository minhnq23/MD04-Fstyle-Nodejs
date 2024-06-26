const express = require("express");
const Order = require("../models/orders");
const UserModel = require("../models/user");
const Product = require("../models/product");
var admin = require("firebase-admin");
const router = require("../api/orderApi");
exports.totalAmount = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const startTime = new Date(startDate);
    const endTime = new Date(endDate);

    const orders = await Order.find({
      status: "delivered",
      timeSuccess: {$gte: startTime, $lte: endTime }
    });

    let uniqueProduct = [];
    let totalAmount = 0;
    const dailyTotalPrices = {};

    orders.forEach(order => {
      const date = order.timeSuccess.toISOString().slice(0, 10);
      if (!dailyTotalPrices[date]) {
        dailyTotalPrices[date] = 0;
      }
      dailyTotalPrices[date] += parseFloat(order.totalPrice);
    });

    const sortedDates = Object.keys(dailyTotalPrices).sort();
    const labels = sortedDates;
    const prices = sortedDates.map(date => dailyTotalPrices[date]);

    for (const order of orders) {
      totalAmount += parseFloat(order.totalPrice);

      for (const product of order.listProduct) {
        const existingProduct = uniqueProduct.find(item => item.idProduct.toString() === product.idProduct.toString());
       
        if (!existingProduct) {
           const foundProduct = await Product.findOne({ _id: product.idProduct });
          uniqueProduct.push({
            idProduct: product.idProduct,
            name: product.name,
            soLuong: product.soLuong,
            price: product.price,
            size: product.size,
            imageDefault: product.imageDefault,
            soldQuantity: foundProduct ? foundProduct.soldQuantity : 0
          });
        }
      }
    }
    console.log(uniqueProduct)
    res.status(200).json({ status: 200, message: "success", total: totalAmount, uniqueProduct:uniqueProduct, labels,prices });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
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
    customerName,
  } = req.body;
  console.log(totalPrice);
  let totalProduct = 0;
  for (const product of listProduct) {
    totalProduct += product.soLuong;
  }

  const newOrder = new Order({
    address,
    listProduct,
    idUser,
    phone,
    paymentMethods,
    shippingMethod,
    totalProduct,
    totalPrice,
    status,
    customerName,
  });
  let user = await UserModel.findById(idUser).lean();
  console.log("====================================");
  console.log("User: ", user);
  console.log("====================================");

  const registrationToken = user.tokenDevice + "";
  console.log("token: ", user.tokenDevice);

  try {
    const order = await newOrder.save();
    const orderId = order._id;
    let user = await UserModel.findById(idUser).lean();
    const registrationToken = user.tokenDevice;
    const message = {
      data: {
        key1: "Mã đơn hàng: " + orderId,
        key2: "Đơn hàng của quý khách đang chờ xác nhận, vui lòng kiểm tra lại trong danh sách đơn hàng",
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

    const oldStatus = order.status;
    order.status = status;
    switch (status) {
      case "active":
        order.timeConfirm = new Date();
        break;
      case "trading":
        order.timeDelivery = new Date();
        break;
      case "deactive":
        order.timeCancel = new Date();
        break;
      case "delivered":
        order.timeSuccess = new Date();
        for (const product of order.listProduct) {
          await Product.findByIdAndUpdate(product.idProduct, {
            $inc: {
              quantity: -product.soLuong,
              soldQuantity: +product.soLuong,
            },
          });
        }
        break;
    }

    await order.save();

    if (oldStatus !== status) {
      const user = await UserModel.findById(order.idUser).lean();
      const registrationToken = user.tokenDevice;

      let notificationMessage = "";
      switch (status) {
        case "pending":
          notificationMessage =
            "Đơn hàng " +
            orderId +
            " của bạn đang chờ xác nhận. Vui lòng kiểm tra trạng thái đơn hàng trong trang cá nhân!";
          break;
        case "active":
          notificationMessage =
            "Đơn hàng " +
            orderId +
            " của bạn đã được xác nhận. Cửa hàng sẽ xử lý và sớm giao tới địa chỉ bạn cung cấp. Vui lòng kiểm tra trạng thái đơn hàng trong trang cá nhân!";
          break;
        case "deactive":
          notificationMessage =
            "Đơn hàng " +
            orderId +
            " của bạn đã xác nhận hủy thành công. Vui lòng kiểm tra trạng thái đơn hàng trong trang cá nhân!";
          break;
        case "trading":
          notificationMessage =
            "Quý khách vui lòng chú ý điện thoại, đơn hàng " +
            orderId +
            " đang được giao đến. Hãy kiểm tra trạng thái của đơn hàng trong trang cá nhân của mình.";
          break;
        case "delivered":
          notificationMessage =
            "Đơn hàng " +
            orderId +
            " của bạn đã được giao thành công. Nếu có vấn đề gì xảy ra hãy liên hệ với của hàng qua hotline: 0123456789";
          break;
        default:
          notificationMessage = "Trạng thái đơn hàng đã được cập nhật.";
      }

      const message = {
        data: {
          key1: "Cập nhật đơn hàng",
          key2: notificationMessage,
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
    }

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
