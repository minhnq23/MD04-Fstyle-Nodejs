const express = require("express");
const Product = require("../models/product");
const UserModel = require("../models/user");

exports.createProduct = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    image64,
    brand,
    price,
    size,
    color,
    quantity,
    type,
    description,
  } = req.body;

  const newProduct = new Product({
    name,
    image64,
    brand,
    price,
    size,
    color,
    quantity,
    type,
    description,
  });
  const admin = await UserModel.findById({ _id: id });
  console.log(admin.isAdmin);
  if (admin.isAdmin) {
    newProduct
      .save()
      .then(async () => {
        res.status(201).json({
          status: 201,
          message: "Product saved successfully",
          product: newProduct,
        });
      })
      .catch((err) => {
        res.status(400).json({ status: 400, message: err.message });
      });
  } else {
    res
      .status(404)
      .json({ status: 404, message: "Bạn không có quyền truy cập " });
  }
};

exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updates = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ status: 404, message: "Không tìm thấy sản phẩm" });
    }
    res.status(200).json({
      status: 200,
      message: "Sản phẩm cập nhật thành công",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId).lean();
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: "Không tìm thấy sản phẩm" });
    }
    res.status(200).json({
      status: 200,
      product: product,
    });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.status(200).json({
      status: 200,
      products: products,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
