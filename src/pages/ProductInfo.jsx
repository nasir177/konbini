// src/pages/ProductInfo.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Topbanner from "../components/TopBanner";
import TopNavSection from "../components/TopNavSection";
import ProductDetail from "../components/ProductDetail";
import Footer from "../components/Footer";

const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("❌ Error fetching product by ID:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  return (
    <>
      <Topbanner />
      <TopNavSection />
      <div className="h-20" />

      {loading ? (
        <p className="text-center text-gray-500 my-10">Loading product...</p>
      ) : product ? (
        <ProductDetail product={product} />
      ) : (
        <p className="text-center text-red-500 my-10">
          ❌ Product not found or invalid ID
        </p>
      )}

      <Footer />
    </>
  );
};

export default ProductInfo;
