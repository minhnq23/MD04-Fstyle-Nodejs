const express = require("express");
const router = express.Router();
const favoriteProductController = require("../controllers/favoriteController");

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
router.delete(
  "/api/favorite/delete/:userId/:productId",
  favoriteProductController.deleteProductFromFavorite
);

module.exports = router;
