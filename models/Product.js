// models/ProductModel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
  subcategory: String,
  description: String,
});

const Product = mongoose.model("Product", productSchema);
export default Product;
