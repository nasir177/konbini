// src/pages/Cart.jsx
import { useEffect, useState } from "react";
import axios from "axios";

import CartSummary from "../components/CartSummary";
import ProductCard from "../components/ProductCard";
import TopBanner from "../components/TopBanner";
import TopNavSection from "../components/TopNavSection";
import CategoryChips from "../components/CategoryChips";

const Cart = () => {
  const [category, setCategory] = useState("Frozen Food");
  const [subcategory, setSubcategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  // Fetch products based on category/subcategory
  useEffect(() => {
    let url = `/api/products?category=${category}`;
    if (subcategory !== "All") {
      url += `&subcategory=${subcategory}`; // backend param fix
    }

    axios
      .get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Error fetching products:", err));
  }, [category, subcategory]);

  // Fetch suggested products for horizontal scroll
  useEffect(() => {
    axios
      .get(`/api/products?category=${category}&limit=10`)
      .then((res) => setSuggestedProducts(res.data))
      .catch((err) => console.error("❌ Error fetching suggested products:", err));
  }, [category]);

  return (
    <div>
      <TopNavSection />

      {/* Main Cart Page Content */}
      <div className="p-4">
        <CartSummary />
      </div>

      {/* ✅ Moved TopBanner and Category Chips + Products below CartSummary */}
      <TopBanner />

      <div className="p-4 mt-4">
        <h1 className="text-2xl font-bold mb-4">{category}</h1>

        <CategoryChips
          category={category}
          subcategory={subcategory}
          setSubcategory={setSubcategory}
        />

        <div className="text-gray-600 text-sm mb-2">
          Showing {products.length} products
        </div>

        {/* ✅ Horizontal Scroll for Product Cards */}
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide pb-4">
          {products.map((item) => (
            <div key={item._id || item.name} className="min-w-[180px]">
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
