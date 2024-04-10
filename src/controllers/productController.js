const express = require("express");
const Product = require("../models/product");
const UserModel = require("../models/user");
const Category = require("../models/category");

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      image64,
      brand,
      price,
      size,
      color,
      quantity,
      description,
      status,
      categoryId,
    } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ status: 404, message: "Không tìm thấy category" });
    }

    const sizeArray = size.map(Number); // Chuyển đổi mảng chuỗi thành mảng số

    const newProduct = new Product({
      name,
      image64,
      brand,
      price,
      size: sizeArray, // Sử dụng mảng số đã chuyển đổi
      color,
      quantity,
      description,
      category: categoryId,
      status,
    });

    await newProduct.save();

    res.status(201).json({
      status: 201,
      message: "Sản phẩm được thêm thành công",
      product: newProduct,
    });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: productId },
      updates,
      {
        new: true,
      }
    );

    await updatedProduct.save();

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
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (deletedProduct) {
      res.status(200).json({
        status: 200,
        message: "Xoá sản phẩm thành công",
        product: deletedProduct,
      });
    } else {
      res.status(404).json({ status: 404, message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
