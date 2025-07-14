import { useEffect, useState } from "react";
import axios from "axios";

import Topbanner from "../components/Topbanner";
import TopNavSection from "../components/TopNavSection";
import CategoryBar from "../components/CategoryBar";
import CategoryChips from "../components/CategoryChips";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Frozen");
  const [subcategory, setSubcategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/products", {
          params: { category: selectedCategory },
        });
        const data = res.data || [];

        // filter client-side by subcategory if not "All"
        const filtered =
          subcategory === "All"
            ? data
            : data.filter((item) => item.subcategory === subcategory);

        setProducts(filtered);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, subcategory]);

  return (
    <>
      <Topbanner />
      <TopNavSection />

      <CategoryBar
        selectedCategory={selectedCategory}
        onSelect={(cat) => {
          setSelectedCategory(cat);
          setSubcategory("All"); // reset subcategory on main category change
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          {selectedCategory} Products
        </h2>

       <CategoryChips
  selectedCategory={selectedCategory}
  selectedSub={subcategory}
  onSelect={setSubcategory}
/>


        <p className="text-gray-600 mt-2 mb-6">
          {loading ? "Loading..." : `${products.length} results`}
        </p>

        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading products...</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 mt-10">No products found.</p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Home;
