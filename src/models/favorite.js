const mongoose = require("mongoose");

const FavoriteProductSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  listProduct: [
    {
      idProduct: {
        type: mongoose.Schema.Types.ObjectId,
      },
      name: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
      defaultImage: {
        type: String,
      },
    },
  ],
});

const FavoriteProductModel = mongoose.model("Favorite", FavoriteProductSchema);

module.exports = FavoriteProductModel;
