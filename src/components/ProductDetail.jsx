import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/CartSlice";
import { motion } from "framer-motion";

export default function ProductDetail({ product }) {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const images = Array.from(new Set([product.image, ...(product.gallery || [])]));

  const [mainImg, setMainImg] = useState(images[0]);

  const handleAddToCart = () => dispatch(addToCart(product));
  const toggleLike = () => setLiked(!liked);

  return (
    <div className="w-full min-h-screen bg-white p-4 md:p-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* ✅ LEFT: Image Gallery */}
        <div className="flex flex-col md:flex-row gap-4 p-2">
          {/* Thumbnail list */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto max-h-[400px] md:max-h-full">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                onClick={() => setMainImg(img)}
                className={`w-16 h-16 object-contain rounded-lg border cursor-pointer ${
                  mainImg === img ? "border-blue-500" : "border-gray-300"
                } bg-white hover:scale-105 transition`}
              />
            ))}
          </div>

          {/* Main image display with zoom */}
          <div className="flex-1 flex justify-center items-center bg-white rounded-xl p-4">
            <div className="relative overflow-hidden group w-full max-w-md">
              <img
                src={mainImg}
                alt={product.name}
                className="w-full h-60 md:h-96 object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* ✅ RIGHT: Product Info */}
        <div className="flex flex-col justify-between p-4 md:p-6 gap-4">
          {/* Product title + like */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold text-orange-600 uppercase tracking-widest">
                Konbini
              </h2>
              <h1 className="text-2xl font-semibold">{product.name}</h1>
            </div>
            <button onClick={toggleLike} className="text-red-500 text-2xl">
              {liked ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </div>

          {/* ✅ Price */}
          <div className="text-2xl font-bold text-blue-600">
            ${product.price?.toFixed(2)}
          </div>

          {/* ✅ Tagline */}
          <p className="text-green-600 text-sm">
            ✅ Freshness guarantee ・ WEEKLY SOLD 1K+
          </p>

          {/* ✅ Add to Cart Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-full py-3 px-6 shadow-lg w-full"
          >
            Add to cart
          </motion.button>
        </div>
      </div>
    </div>
  );
}
