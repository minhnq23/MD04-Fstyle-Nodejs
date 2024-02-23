const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const addressController = require("../controllers/addressController");

const User = require("../models/user");
router.post("/api/user/address/post/:id", addressController.addAddress);

router.post("/api/user/address/list/:id", addressController.getAddress);
router.put(
  "/api/user/address/update/:id/:id_address",
  addressController.updateAddress
);
router.put(
  "/api/user/address/del/:id/:id_address",
  addressController.deleteAddress
);

module.exports = router;
