const express = require("express");
const router = express.Router();
const favoriteProductController = require("../controllers/favoriteProductController");

router.get(
  "/:userId/products",
  favoriteProductController.getAllProductFavorites
);
router.post("/:userId/products", favoriteProductController.addProductFavorites);
router.put(
  "/:userId/products/:productId",
  favoriteProductController.updateProductFavorites
);

module.exports = router;
