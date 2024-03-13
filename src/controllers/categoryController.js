const express = require("express");
const Category = require("../models/category");
const UserModel = require("../models/user");

exports.createCategory = async (req, res) => {
  try {
    const { idAdmin, name, description } = req.body;
    const admin = await UserModel.findById({_id: idAdmin});
    console.log(admin.isAdmin);
    if (admin.isAdmin) {
      const existingCategory = await Category.findOne({ name });

      if (existingCategory) {
        return res
          .status(400)
          .json({ status: 400, message: "Category already exists" });
      }

      const newCategory = new Category({
        name,
        description,
      });

      await newCategory.save();

      res.status(201).json({
        status: 201,
        message: "Category created successfully",
        category: newCategory,
      });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Bạn không có quyền truy cập " });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.status(200).json({
      status: 200,
      categories: categories,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

exports.getCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findById(categoryId).lean();

    if (category) {
      res.status(200).json({
        status: 200,
        category: category,
      });
    } else {
      res.status(404).json({ status: 404, message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { idAdmin, ...updates } = req.body;
  const admin = await UserModel.findById({ _id: idAdmin });
  console.log(admin.isAdmin);
  if (!admin || !admin.isAdmin) {
    return res
      .status(403)
      .json({ status: 403, message: "Bạn không có quyền truy cập" });
  }
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updates,
      {
        new: true,
      }
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ status: 404, message: "Category not found" });
    }

    res.status(200).json({
      status: 200,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res
        .status(404)
        .json({ status: 404, message: "Category not found" });
    }

    res.status(200).json({
      status: 200,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
