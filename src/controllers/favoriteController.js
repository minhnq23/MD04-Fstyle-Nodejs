const express = require("express");
const Favorite = require("../models/favorite");
const UserModel = require("../models/user");

exports.addFavorite = async (req, res) => {
  const userId = req.params.id;
  const favoriteUpdate = req.body;

  try {
    let favorite = await Favorite.findOne({ userId });

    if (!favorite) {
      favorite = new Favorite({ userId, items: favoriteUpdate.items });
    } else {
      favorite.items = favoriteUpdate.items;
    }

    await favorite.save();

    res.status(201).json({
      status: 201,
      message: "Đã cập nhật danh sách yêu thích thành công",
      favorite: favorite,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
