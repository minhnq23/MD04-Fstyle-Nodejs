const express = require("express");
const router = express.Router();
const favoriteProductController = require("../controllers/favoriteProductController");

router.put(
  "/api/add/product/favorite/:id_user",
  favoriteProductController.addFavorite
);

module.exports = router;
