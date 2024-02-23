const express = require("express");
const Product = require("../models/product");

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  let product = await Product.findById(id).lean();
  res.json(product);
};

exports.createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image64: req.body.image64,
    brand: req.body.brand,
    price: req.body.price,
    size: req.body.size,
    color: req.body.color,
    status: req.body.status,
    type: req.body.type,
    description: req.body.description,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.updateProduct = async (req, res) => {
  const _id = req.params.id;
  const updates = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(_id, updates, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
