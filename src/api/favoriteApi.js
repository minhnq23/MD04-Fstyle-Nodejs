const express = require("express");
const router = express.Router();
const favoriteProductController = require("../controllers/favoriteController");

// Định nghĩa các tuyến đường cho API của Favorite Product
router.get(
  "/api/favorite/get/:userId",
  favoriteProductController.getFavoriteProducts
);
router.post(
  "/api/favorite/post/:userId",
  favoriteProductController.addProductToFavorite
);
router.put(
  "/api/favorite/put/:userId/:productId",
  favoriteProductController.updateProductInFavorite
);

module.exports = router;
