const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.put("/api/add/product/cart/:id_user", cartController.addCart);

module.exports = router;
