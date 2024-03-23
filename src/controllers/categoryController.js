const express = require("express");
const Category = require("../models/category");
const UserModel = require("../models/user");

exports.createCategory = async (req, res) => {
  const { name, image } = req.body;

  try {
    const newCategory = new Category({ name, image });
    await newCategory.save();
    res.status(201).json({
      status: 201,
      message: "Tạo thể loại thành công",
      category: newCategory,
    });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: 200,
      categories: categories,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findById(categoryId);
    if (category) {
      res.status(200).json({
        status: 200,
        category: category,
      });
    } else {
      res.status(404).json({ status: 404, message: "Không tìm thấy thể loại" });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
exports.deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (deletedCategory) {
      res.status(200).json({
        status: 200,
        message: "Xoá thể loại thành công",
        category: deletedCategory,
      });
    } else {
      res.status(404).json({ status: 404, message: "Không tìm thấy thể loại" });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
exports.updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name, image } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, image },
      { new: true }
    );
    if (updatedCategory) {
      res.status(200).json({
        status: 200,
        message: "Sửa thể loại thành công",
        category: updatedCategory,
      });
    } else {
      res.status(404).json({ status: 404, message: "Không tìm thấy thể loại" });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
