import { useEffect, useState } from "react";
import CartSummary from "../components/CartSummary";
import ProductCard from "../components/ProductCard";
import TopBanner from "../components/Topbanner";
import TopNavSection from "../components/TopNavSection";
import CategoryChips from "../components/CategoryChips";
import axios from "axios";


const Cart = () => {
  const [subcategory, setSubcategory] = useState("All");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products?category");
        const data = res.data || [];
        // Filter by subcategory (if not "All")
        const filtered =
          subcategory === "All"
            ? data
            : data.filter((item) => item.subcategory === subcategory);
        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [subcategory]);

  return (
    <>
      <TopBanner />
      <TopNavSection />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">🛍️ Your Cart</h1>
        <CartSummary />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">🧊 Recommendations</h1>

        <div className="px-4">
          <CategoryChips
            selected={subcategory}
            onSelect={setSubcategory}
          />
          <p className="text-gray-600 my-2">{products.length} results</p>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8">
              {products.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No related products found.</p>
          )}
        </div>
      </div>
    
    </>
  );
};

export default Cart;
