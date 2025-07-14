import { useSelector } from "react-redux";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CartDrawer({ onClose }) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  return (
    <div className="fixed right-4 top-20 bg-white w-[340px] max-h-[80vh] overflow-y-auto rounded-xl shadow-lg border p-4 z-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold text-lg">🛒 Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-red-500">
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-sm">Your cart is empty.</p>
      ) : (
        <div className="space-y-3">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 border-b pb-2 last:border-none"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}

          <button
            onClick={() => {
              onClose();
              navigate("/cart");
            }}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Cart
          </button>
        </div>
      )}
    </div>
  );
}
