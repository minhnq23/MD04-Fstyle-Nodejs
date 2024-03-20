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
    (item) => item.idProduct.toString() === product.id
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
    (item) => item.idProduct.toString() !== productIdToRemove
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
  const userId = req.params.id_user;
  let result = await Cart.findOne({
    idUser: userId,
  }).lean();

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ status: 404, message: "Không tìm thấy giỏ hàng" });
  }
};
