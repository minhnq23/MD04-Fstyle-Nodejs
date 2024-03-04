const express = require("express");
const router = express.Router();
const favoriteProductController = require("../controllers/favoriteProductController");

router.get(
  "/users/:userId/products",
  favoriteProductController.getAllProductFavorites
);
router.post(
  "/users/:userId/products",
  favoriteProductController.addProductFavorites
);
router.put(
  "/users/:userId/products/:productId",
  favoriteProductController.updateProductFavorites
);

module.exports = router;
