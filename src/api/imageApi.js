const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");

router.post("/api/user/avatar/image/:id", imageController.imageUser);
module.exports = router;
