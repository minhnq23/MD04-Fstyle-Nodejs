const express = require("express");
const User = require("../models/user");

exports.imageUser = async (req, res) => {
  const id = req.params.id;
  let user = await User.findById(id).lean();
  const base64data = user.avatar;
  console.log(base64data);


  // Extract the data part of the base64 string h
  const data = base64data.replace(/^data:image\/\w+;base64,/, "");

  // Create a Buffer from the base64 data
  const buffer = Buffer.from(data, "base64");

  // Set the Content-Type header to indicate the type of the response
  res.setHeader("Content-Type", "image/png");

  // Send the buffer as the response
  res.end(buffer);
};
exports.imagesProduct = async (req, res) => {};
