// src/components/ProductDetail.jsx
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/CartSlice";
import { motion } from "framer-motion";
import clsx from "clsx";

const variants = [
  { label: "Chicken", price: 10.99 },
  { label: "Seafood", price: 10.99 },
  { label: "Pork & Chicken", price: 8.88, discount: 19 },
  { label: "Vegetable", price: 10.99 },
  { label: "Pork Shumai", price: 11.99 },
  { label: "Shrimp Shumai", price: 11.99 },
  { label: "Chicken Shumai", price: 11.99 },
];

export default function ProductDetail({ product }) {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState("Pork & Chicken");

  const images = [
    product?.image,
    "https://img.weeecdn.net/image2.png",
    "https://img.weeecdn.net/image3.png",
  ];

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const toggleLike = () => setLiked(!liked);
  const currentVariant = variants.find((v) => v.label === selectedFlavor);

  return (
    <div className="w-full min-h-screen bg-white p-4 md:p-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Left side image gallery */}
        <div className="flex flex-col md:flex-row gap-6 p-4">
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className="w-16 h-16 object-contain rounded-lg border cursor-pointer bg-white hover:scale-105 transition"
              />
            ))}
          </div>

          <div className="flex-1 flex justify-center items-center bg-amber-100 rounded-xl p-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-60 object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between p-4 md:p-6 gap-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold text-gray-600 uppercase tracking-widest">
                AJINOMOTO
              </h2>
              <h1 className="text-2xl font-semibold">{product.name}</h1>
            </div>
            <button onClick={toggleLike} className="text-red-500 text-2xl">
              {liked ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </div>

          <div className="text-2xl font-bold text-blue-600">
            ${currentVariant?.price?.toFixed(2)}
            {currentVariant?.discount && (
              <>
                <span className="ml-2 text-sm text-gray-400 line-through">
                  ${(10.99).toFixed(2)}
                </span>
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-[2px] rounded-full">
                  {currentVariant.discount}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-green-600 text-sm">
            ✅ Freshness guarantee ・ WEEKLY SOLD 1K+
          </p>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Flavor: <span className="font-bold">{selectedFlavor}</span>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {variants.map((v) => (
                <button
                  key={v.label}
                  onClick={() => setSelectedFlavor(v.label)}
                  className={clsx(
                    "border rounded-md px-3 py-2 text-sm transition-all",
                    selectedFlavor === v.label
                      ? "border-blue-600 text-blue-600 font-semibold bg-blue-50"
                      : "hover:border-blue-400"
                  )}
                >
                  {v.label}
                  <br />
                  <span className="text-gray-500">${v.price}</span>
                </button>
              ))}
            </div>
          </div>

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
