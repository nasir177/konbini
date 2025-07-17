// src/pages/Cart.jsx
import { useEffect, useState } from "react";
import axios from "axios";

import CartSummary from "../components/CartSummary";
import ProductCard from "../components/ProductCard";
import TopBanner from "../components/TopBanner";
import TopNavSection from "../components/TopNavSection";
import CategoryChips from "../components/CategoryChips";
import CategoryBar from "../components/CategoryBar";

const Cart = () => {
  const [selectedCategory, setSelectedCategory] = useState("Frozen Food");
  const [subcategory, setSubcategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = `/api/products?category=${selectedCategory}`;
    setLoading(true);
    axios
      .get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Error fetching products:", err))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <div>
      {/* Top banner */}
      <TopBanner />

      {/* Navigation and Cart */}
      <TopNavSection />
      <CartSummary />

 

      {/* Category Bar */}
      <CategoryBar
        selectedCategory={"Snacks"}
        onSelect={(cat) => {
          setSelectedCategory(cat);
          setSubcategory("All");
        }}
      />

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          {selectedCategory} Products
        </h2>

     

        <p className="text-gray-600 mt-2 mb-4">
          {loading ? "Loading..." : `${products.length} results`}
        </p>

        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading products...</p>
        ) : products.length > 0 ? (
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 w-max">
              {products.map((product) => (
                <div key={product._id} className="min-w-[200px] max-w-xs">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-400 mt-10">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
