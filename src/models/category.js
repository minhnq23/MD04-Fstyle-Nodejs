const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
});

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
