const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userController = require("../../controllers/userController");
const User = require("../../models/user");
router.post("/api/user/client/post", userController.postUser);
router.put("/api/user/client/update/:id", userController.postUser);

module.exports = router;
