const express = require("express");
const User = require("../models/user");
const Cart = require("../models/cart");
const UserModel = require("../models/user");

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  const authUser = await UserModel.findOne({ email: email });
  if (!authUser) {
    // Handle case where user with the provided email is not found
    return res.status(404).json({ message: "User not found" });
  } else {
    if (!(password == authUser.password)) {
      return res.status(404).json({ message: "sai mật khẩu" });
    }
  }
  res.json(authUser);
};

exports.createUser = async (req, res) => {
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
    .then(async () => {
      const id = newUser._id;
      console.log("id user: ", id);
      const newCart = new Cart({ idUser: id });
      await newCart.save().then(() => console.log("add thành công"));
      res.status(201).json({
        status: 201,
        success: true,
        message: "Đã tạo mới người dùng thành công.",
        _id: id,
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

exports.createCart = async (req, res) => {};
