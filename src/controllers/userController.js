const express = require("express");
const User = require("../models/user");
const UserModel = require("../models/user");

exports.createUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Missing request body" });
  }
  const {
    name,
    email,
    password,
    tokenDevice,
    avatar,
    address,
    phone,
    consigneeName,
  } = req.body;
  const newUser = new User({
    name,
    email,
    password,
    tokenDevice,
    avatar,
    address,
    phone,
    consigneeName,
    isAdmin: false,
  });
  console.log(newUser);
  await newUser
    .save()
    .then(() => {
      res.status(201).json({
        status: 201,
        success: true,
        message: "Đã tạo mới người dùng thành công.",
        email: email,
        token: tokenDevice,
      });
    })
    .catch((err) => {
      res.status(404).json({
        status: 404,
        success: false,
        message: "Tạo mới người dùng không thành công.",
      });
    });
};
exports.updateUser = async (req, res) => {
  const _id = req.params.id;
  const userUpdate = req.body;
  const result = await User.findByIdAndUpdate(_id, userUpdate);
  if (result) {
    res.status(201).json({
      status: 201,
      message: "Cập nhật thông tin user thành công",
      user: result,
    });
  } else {
    res.status(404).json({ status: 404, message: "Không tìm thấy user" });
  }
};
exports.getUser = async (req, res) => {
  const id = req.params.id;
  let user = await User.findById(id).lean();
  res.json(user);
};
