const FavoriteProduct = require("../models/FavoriteProduct");

exports.getAllProductFavorites = async (req, res) => {
  const userId = req.params.userId;

  try {
    const favoriteProducts = await FavoriteProduct.findOne({ userId });

    if (!favoriteProducts || favoriteProducts.listProduct.length === 0) {
      return res
        .status(404)
        .json({
          message: "Không có sản phẩm trong danh sách yêu thích của người dùng",
        });
    }

    res.json(favoriteProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addProductFavorites = async (req, res) => {
  const userId = req.params.userId;
  const { idProduct, quantity } = req.body;

  try {
    let favoriteProducts = await FavoriteProduct.findOne({ userId });

    if (!favoriteProducts) {
      favoriteProducts = new FavoriteProduct({ userId, listProduct: [] });
    }

    favoriteProducts.listProduct.push({ idProduct, quantity });
    await favoriteProducts.save();

    res.status(201).json({ message: "Sản phẩm đã được thêm vào yêu thích" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProductFavorites = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  const { quantity } = req.body;

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

    favoriteProducts.listProduct[productIndex].quantity = quantity;
    await favoriteProducts.save();

    res.json(favoriteProducts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
