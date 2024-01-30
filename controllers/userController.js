const express = require("express");
const User = require("../models/user");

exports.createUser = async (req, res) => {
  const { email, password, tokenDevice } = req.body;
  const newUser = new User({ email, password, tokenDevice });
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