const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");

router.get("/api/user/avatar/image/:id", imageController.imageUser);
module.exports = router;
