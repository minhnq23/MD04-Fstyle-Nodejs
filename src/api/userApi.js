const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userController = require("../controllers/userController");
const User = require("../models/user");
router.post("/api/user/post", userController.createUser);
router.get("/api/user/:id", userController.getUser);
router.put("/api/user/update/:id", userController.updateUser);
router.post("/api/user/signin", userController.signIn);
router.get("/api/user/lockup/:id",userController.lockupUser)
module.exports = router;
