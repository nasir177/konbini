// models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  discount: Number,
  image: String,
  sideImages: [String],
  category: String,
  subCategory: String,
});

module.exports = mongoose.model("Product", ProductSchema);
