const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/api/categories", categoryController.getAllCategories);
router.get("/api/categories/:id", categoryController.getCategory);
router.post("/api/categories", categoryController.createCategory);
router.put("/api/categories/:id", categoryController.updateCategory);
router.delete("/api/categories/:id", categoryController.deleteCategory);

module.exports = router;
