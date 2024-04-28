const express = require("express");
const router = express.Router();

router.get("/statistical", (req, res) => {
  res.render("statistical");
});

module.exports = router;
