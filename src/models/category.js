const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // Tên category là duy nhất
  },
  description: {
    type: String
  }
});

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
