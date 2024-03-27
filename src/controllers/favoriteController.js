const express = require("express");
const FavoriteProduct = require("../models/favorite");

exports.getFavoriteProducts = async (req, res) => {
  const userId = req.params.userId;

  try {
    const favoriteProducts = await FavoriteProduct.findOne({ userId });
    res.json(favoriteProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addProductToFavorite = async (req, res) => {
  const userId = req.params.userId;
  const product = req.body;
  const { idProduct, name, quantity, price, defaultImage } = req.body;

  try {
    let favoriteProducts = await FavoriteProduct.findOne({ userId });

    if (!favoriteProducts) {
      favoriteProducts = new FavoriteProduct({ userId, listProduct: [] });
    } else {
      const existingProduct = favoriteProducts.listProduct.find(
        (item) => String(item.idProduct) === String(product.idProduct)
      );
      if (existingProduct) {
        return res
          .status(400)
          .json({ message: "Sản phẩm đã tồn tại trong danh sách yêu thích" });
      }
    }

    favoriteProducts.listProduct.push({
      idProduct,
      name,
      quantity,
      price,
      defaultImage,
    });

    await favoriteProducts.save();

    res
      .status(201)
      .json({ message: "Sản phẩm đã được thêm vào danh sách yêu thích" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProductInFavorite = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  const updates = req.body;

  try {
    let favoriteProducts = await FavoriteProduct.findOne({ userId });

    if (!favoriteProducts) {
      return res
        .status(404)
        .json({ message: "Danh sách yêu thích không tồn tại" });
    }

    const productIndex = favoriteProducts.listProduct.findIndex(
      (product) => product.idProduct.toString() === productId
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Sản phẩm không tồn tại trong danh sách yêu thích" });
    }

    const duplicateProductIndex = favoriteProducts.listProduct.findIndex(
      (product, index) =>
        index !== productIndex && product.idProduct.toString() === productId
    );

    if (duplicateProductIndex !== -1) {
      return res
        .status(400)
        .json({ message: "Sản phẩm đã tồn tại trong danh sách yêu thích" });
    }

    Object.assign(favoriteProducts.listProduct[productIndex], updates);
    await favoriteProducts.save();

    res.json(favoriteProducts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProductFromFavorite = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  try {
    const favoriteProducts = await FavoriteProduct.findOneAndUpdate(
      { userId },
      { $pull: { listProduct: { idProduct: productId } } },
      { new: true }
    );

    if (!favoriteProducts) {
      return res
        .status(404)
        .json({ message: "Danh sách yêu thích không tồn tại" });
    }

    res.json({ message: "Sản phẩm đã được xóa khỏi danh sách yêu thích" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
