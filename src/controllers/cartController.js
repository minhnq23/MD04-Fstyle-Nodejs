const express = require("express");
const Cart = require("../models/cart");
const UserModel = require("../models/user");

exports.addCart = async (req, res) => {
  const userId = req.params.id_user;
  console.log(userId);
  const product = req.body;
  let result = await Cart.findOne({
    idUser: userId,
  });

  console.log("user", result);
  const existingProduct = result.listProduct.find(
    (item) => item.idProduct === product.id
  );

  if (existingProduct) {
    existingProduct.soLuong += product.soLuong;
  } else {
    result.listProduct.push({
      idProduct: product.id,
      name: product.name,
      soLuong: product.soLuong,
      size: product.size,
      price: product.price,
      imageDefault: product.imageDefault,
    });
  }

  result.totalCart += product.soLuong * product.price;

  await result.save();
  res.status(201).json({
    cart: result,
  });
};
exports.removeProduct = async (req, res) => {
  const userId = req.params.id_user;
  const productId = req.params.id_product;
  console.log(userId);
  let result = await Cart.findOne({
    idUser: userId,
  });

  result.listProduct = result.listProduct.filter(
    (item) => item.idProduct !== productIdToRemove
  );
  result.totalCart = result.listProduct.reduce(
    (total, item) => total + item.soLuong * item.price
  );

  await result.save();
  res.status(201).json({
    cart: result,
  });
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.params.id_user;
    console.log("userId: ", userId);

    // Look up the cart based on userId
    const cart = await Cart.findOne({ idUser: userId });

    if (cart) {
      res.json(cart); // If found, return the cart
    } else {
      // If not found, return a 404 error
      res.status(404).json({
        status: 404,
        message: "Không tìm thấy giỏ hàng",
      });
    }
  } catch (error) {
    // If there's any error during the process, return a 500 error
    console.error("Error retrieving cart:", error);
    res.status(500).json({
      status: 500,
      message: "Đã xảy ra lỗi khi lấy thông tin giỏ hàng",
    });
  }
};
