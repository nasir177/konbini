// src/pages/Cart.jsx
import { useEffect, useState } from "react";
import axios from "axios";

import CartSummary from "../components/CartSummary";
import ProductCard from "../components/ProductCard";
import TopBanner from "../components/TopBanner";
import TopNavSection from "../components/TopNavSection";
import CategoryChips from "../components/CategoryChips";

const Cart = () => {
  const [category, setCategory] = useState("Frozen Food"); // default category
  const [subcategory, setSubcategory] = useState("All");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let url = `/api/products?category=${category}`;
    if (subcategory !== "All") {
      url += `&subCategory=${subcategory}`;
    }

    axios.get(url)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, [category, subcategory]);

  return (
    <div>
      <TopNavSection />
      <TopBanner />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{category}</h1>
        <CategoryChips
          category={category}
          subcategory={subcategory}
          setSubcategory={setSubcategory}
        />

        <div className="text-gray-600 text-sm mb-2">
          Showing {products.length} products
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((item) => (
            <ProductCard key={item._id || item.name} product={item} />
          ))}
        </div>
      </div>

      <CartSummary />
    </div>
  );
};

export default Cart;
