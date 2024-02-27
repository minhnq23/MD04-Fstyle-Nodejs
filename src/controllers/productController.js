const express = require("express");
const Product = require("../models/product");
const UserModel = require("../models/user");
const Category = require("../models/category");

exports.createProduct = async (req, res) => {
  const {
    idAdmin,
    name,
    image64,
    brand,
    price,
    size,
    color,
    quantity,
    status,
    type,
    description,
    categoryId,
  } = req.body;
  //Check có tồn tại category không
  const category = await Category.findById(categoryId);
  if (!category) {
    return res
      .status(404)
      .json({ status: 404, message: "Không tìm thấy category" });
  }
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
    category: categoryId,
  });
  const admin = await UserModel.findById({ _id: idAdmin });
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
  try {
    const productId = req.params.id;
    const { idAdmin, ...updates } = req.body; // Lấy tất cả các trường cần cập nhật từ body trừ idAdmin

    // Kiểm tra xem người dùng có quyền admin không
    const admin = await UserModel.findById(idAdmin);
    if (!admin || !admin.isAdmin) {
      return res
        .status(403)
        .json({ status: 403, message: "Bạn không có quyền truy cập" });
    }

    // Thực hiện cập nhật sản phẩm
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: productId },
      updates,
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ status: 404, message: "Không tìm thấy sản phẩm" });
    }

    res.status(200).json({
      status: 200,
      message: "Sản phẩm đã được cập nhật thành công",
      product: updatedProduct,
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
exports.getProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId).lean();

    if (product) {
      res.status(200).json({
        status: 200,
        product: product,
      });
    } else {
      res.status(404).json({ status: 404, message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
