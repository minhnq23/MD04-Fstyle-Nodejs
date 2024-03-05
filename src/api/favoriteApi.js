const express = require("express");
const router = express.Router();
const favoriteProductController = require("../controllers/favoriteProductController");

router.get(
  "/users/:userId/list/products",
  favoriteProductController.getAllProductFavorites
);
router.post(
  "/users/:userId/list/products/:productId",
  favoriteProductController.addProductFavorites
);
router.put(
  "/users/:userId/list/products/:productId",
  favoriteProductController.updateProductFavorites
);

module.exports = router;
