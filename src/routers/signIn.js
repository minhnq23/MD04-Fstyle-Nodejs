// routes/signInRouter.js
const express = require("express");
const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("signIn");
});

module.exports = router;
