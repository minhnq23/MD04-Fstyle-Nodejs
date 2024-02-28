const mongoose = require("mongoose");

const FavoriteProductSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  listProduct: [
    {
      idProduct: {
        type: mongoose.Schema.Types.ObjectId,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const FavoriteProductModel = mongoose.model("Favorite", FavoriteProductSchema);

module.exports = FavoriteProductModel;
