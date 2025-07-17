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
  const [suggestedProducts, setSuggestedProducts] = useState([]); // 👈 additional horizontal products

  // Fetch main category/subcategory products
  useEffect(() => {
    let url = `/api/products?category=${category}`;
    if (subcategory !== "All") {
      url += `&subCategory=${subcategory}`;
    }

    axios
      .get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Error fetching products:", err));
  }, [category, subcategory]);

  // Fetch additional products (suggested section)
  useEffect(() => {
    axios
      .get(`/api/products?category=${category}&limit=10`) // adjust as needed
      .then((res) => setSuggestedProducts(res.data))
      .catch((err) => console.error("❌ Error fetching suggested products:", err));
  }, [category]);

  return (
    <div>
       <TopBanner />
      <TopNavSection />
     

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{category}</h1>

     

        <div className="text-gray-600 text-sm mb-2">
          Showing {products.length} products
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((item) => (
            <ProductCard key={item._id || item.name} product={item} />
          ))}
        </div>
      </div>
         <CategoryChips
          category={category}
          subcategory={subcategory}
          setSubcategory={setSubcategory}
        />

      {/* Horizontal Scroll Section */}
      <div className="p-4 mt-8">
        <h2 className="text-xl font-semibold mb-2">You might also like</h2>
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
          {suggestedProducts.map((item) => (
            <div key={item._id || item.name} className="min-w-[180px]">
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>

      <CartSummary />
    </div>
  );
};

export default Cart;
