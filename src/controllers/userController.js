const express = require("express");
const User = require("../models/user");
const Cart = require("../models/cart");
const UserModel = require("../models/user");
exports.lockupUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isLocked = !user.isLocked;
    await user.save();
    res.status(200).json({ message: "User locked status updated", user });
  } catch (error) {
    console.error("Error updating user locked status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.signIn = async (req, res) => {
  const { email, password, tokenDevice } = req.body;
  console.log(email, password, tokenDevice);
  const authUser = await UserModel.findOne({ email: email });
  if (!authUser) {
    return res.status(404).json({ message: "User not found" });
  } else {
    if (!(password == authUser.password)) {
      return res.status(404).json({ message: "sai mật khẩu" });
    }
  }

  authUser.tokenDevice = tokenDevice;
  authUser.lastLoggedIn = new Date();
  await authUser.save();
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

  const authUser = await UserModel.findOne({ email: email });
  if (authUser) {
    return res.status(404).json({ message: "Email đã tồn tại" });
  }
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
