// models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  discount: Number,
  image: String,
  sideImages: [String],
  category: String,
  subCategory: String,
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
