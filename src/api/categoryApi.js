const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/api/get/categories", categoryController.getAllCategories);
router.get("/api/get/categories/:id", categoryController.getCategoryById);
router.post("/api/post/categories", categoryController.createCategory);
router.put("/api/put/categories/:id", categoryController.updateCategory);
router.delete("/api/delete/categories/:id", categoryController.deleteCategory);

module.exports = router;
