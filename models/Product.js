// models/Product.js
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  discount: Number,
  image: String,
  sideImages: [String],
  category: String,
  subcategory: String, // ✅ fixed from subCategory
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
