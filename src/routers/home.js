// routes/home.js
const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  res.render("products");
});

module.exports = router;
