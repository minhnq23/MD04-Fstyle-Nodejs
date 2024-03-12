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
        default: "Name",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        default: 0.0,
      },
      image64: {
        type: String,
      },
    },
  ],
});

const FavoriteProductModel = mongoose.model("Favorite", FavoriteProductSchema);

module.exports = FavoriteProductModel;
