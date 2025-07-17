// src/pages/Cart.jsx
import { useEffect, useState } from "react";
import axios from "axios";

import CartSummary from "../components/CartSummary";
import ProductCard from "../components/ProductCard";
import TopBanner from "../components/TopBanner";
import TopNavSection from "../components/TopNavSection";

const Cart = () => {
  const [category] = useState("Frozen Food");
  const [products, setProducts] = useState([]);

  // Fetch default category products (Frozen Food)
  useEffect(() => {
    const url = `/api/products?category=${category}`;
    axios
      .get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Error fetching products:", err));
  }, [category]);

  return (
    <div>
      <TopBanner />
      <TopNavSection />

      <div className="p-4">
        <CartSummary />
      </div>

      <div className="p-4 mt-4">
        <h1 className="text-2xl font-bold mb-4">{category}</h1>

        <div className="text-gray-600 text-sm mb-2">
          Showing {products.length} products
        </div>

        {/* ✅ Horizontal Scroll with Hidden Scrollbar */}
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
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
