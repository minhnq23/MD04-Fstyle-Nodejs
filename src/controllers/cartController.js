const express = require("express");
const Cart = require("../models/cart");
const UserModel = require("../models/user");

exports.addCart = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const product = req.body;
  let result = await Cart.findOne({
    idUser: "65d4678f3b57f5dfc3b5d9ec",
  });
  console.log(result);
  const existingProduct = result.listProduct.find(
    (item) => item.idProduct.toString() === product.id
  );

  if (existingProduct) {
    // Nếu sản phẩm đã tồn tại, cập nhật số lượng
    existingProduct.quantity += product.quantity;
  } else {
    // Nếu sản phẩm chưa tồn tại, thêm mới vào mảng items
    result.listProduct.push({
      idProduct: product.id,
      name: productName,
      quantity: quantity,
      price: price,
    });
  }

  // Cập nhật tổng giá trị giỏ hàng
  result.totalCart += product.quantity * product.price;

  // Lưu giỏ hàng vào cơ sở dữ liệu
  await result.save();
  res.status(201).json({
    cart: result,
  });

  // if (result) {
  //   res.status(201).json({
  //     status: 201,
  //     message: "Đã thêm sản phẩm thành công",
  //     user: result,
  //   });
  // } else {
  //   res.status(404).json({ status: 404, message: "Không thêm được sản phẩm" });
  // }
};
