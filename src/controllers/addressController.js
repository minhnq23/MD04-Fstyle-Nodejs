const express = require("express");
const Address = require("../models/address");

exports.addAddress = async (req, res) => {
  const idUser = req.params.id;
  const { homeNumber, street, district, city, phoneNumber, consigneeName } =
    req.body;
  const result = new Address({
    idUser,
    homeNumber,
    street,
    district,
    city,
    phoneNumber,
    consigneeName,
  });

  await result
    .save()
    .then(() => {
      res.status(201).json({
        status: 201,
        message: "Address saved successfully",
        address: result,
      });
    })
    .catch((err) => {
      res
        .status(404)
        .json({ status: 404, message: "Không thể thêm được đia chỉ" });
    });
};

exports.updateAddress = async function (req, res) {
  const userId = req.params.id;
  const id = req.params.id_address;
  const address = req.body;
  const result = await Address.findOneAndUpdate({ _id: id }, address);
  if (result) {
    res.status(201).json({
      status: 201,
      message: "Cập nhật thông tin địa chỉ thành công",
      information: address,
    });
  } else {
    res.status(404).json({ status: 404, message: "Không tìm thấy địa chỉ" });
  }
};

exports.getAddress = async function (req, res) {
  const id = req.params.id;
  const listAddress = await Address.find({ idUser: id }).lean();
  if (listAddress) {
    res.status(201).json({
      status: 201,
      list_address: listAddress,
    });
  } else {
    res
      .status(404)
      .json({ status: 404, message: "Chưa có địa chỉ nào địa chỉ" });
  }
};
