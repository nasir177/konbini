import { useDispatch } from "react-redux";
import { addToCart } from "../store/CartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiFillStar } from "react-icons/ai";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [cartPop, setCartPop] = useState(false);

  if (!product || !product._id) {
    return (
      <div className="bg-red-100 text-red-600 text-xs p-2 rounded shadow">
        ❌ Invalid product data
      </div>
    );
  }

  const { _id, name = "Unnamed", price = 0, discount = 0, image = "" } = product;
  const discountedPrice = (price * (1 - discount / 100)).toFixed(2);

  const handleAdd = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    setCartPop(true);
    setTimeout(() => setCartPop(false), 600);
  };

  const handleNavigate = () => navigate(`/product/${_id}`);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      onClick={handleNavigate}
      className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all w-full max-w-[255px] p-6 flex flex-col gap-2"
    >
      {discount > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-[1px] rounded-full shadow">
          {discount}% OFF
        </div>
      )}

      <div
        className="absolute top-2 right-2 text-lg text-red-500 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setLiked((prev) => !prev);
        }}
      >
        {liked ? <AiFillHeart /> : <AiOutlineHeart />}
      </div>

      <div className="aspect-square flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="bg-amber-100 h-28 w-28 object-contain"
        />
      </div>

      <h3 className="text-sm font-semibold text-gray-800 truncate" title={name}>
        {name}
      </h3>

      <div className="flex gap-1 text-yellow-400 text-sm">
        {[...Array(5)].map((_, i) => (
          <AiFillStar key={i} />
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm font-bold text-blue-600">
        <span>${discountedPrice}</span>
        {discount > 0 && (
          <span className="text-xs text-gray-400 line-through">
            ${price.toFixed(2)}
          </span>
        )}
      </div>

      <div className="flex justify-end mt-1 relative">
        <motion.button
          onClick={handleAdd}
          whileHover={{ scale: 1.1 }}
          className="relative bg-blue-600 text-white text-sm rounded-full w-8 h-8 flex items-center justify-center"
        >
          +
        </motion.button>

        <AnimatePresence>
          {cartPop && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: -20 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute right-0 text-xs bg-green-500 text-white px-2 py-1 rounded shadow"
            >
              Added!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}