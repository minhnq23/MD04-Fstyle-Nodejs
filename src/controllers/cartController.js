const express = require("express");
const Cart = require("../models/cart");
const UserModel = require("../models/user");

exports.addCart = async (req, res) => {
  const idUser = req.params.id;
  const cartUpdate = req.body;
  const result = await Cart.findOneAndUpdate(idUser, cartUpdate);
  if (result) {
    res.status(201).json({
      status: 201,
      message: "Đã thêm sản phẩm thành công",
      user: result,
    });
  } else {
    res.status(404).json({ status: 404, message: "Không thêm được sản phẩm" });
  }
};
