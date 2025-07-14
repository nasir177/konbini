import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../store/cartSlice";

import {
  PackageCheck,
  Truck,
  Gift,
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
} from "lucide-react";

export default function CartSummary({ showCheckout = true }) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingFee = itemTotal > 50 ? 0 : 5.99;
  const subtotal = itemTotal + shippingFee;
  const remaining = 50 - itemTotal;

  // ETA is 7 days from now
  const today = new Date();
  const eta = new Date(today.setDate(today.getDate() + 7)).toDateString(); // e.g., "Tue Jul 16 2025"

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 flex flex-col items-center">
        <ShoppingCart className="w-10 h-10 mb-2" />
        <p>🛒 Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* 🧊 Left Side - Cart List */}
      <div className="md:col-span-2 space-y-4">
        <div className="bg-white rounded-xl shadow p-6 border">
          <div className="flex items-center gap-3 mb-6">
            <PackageCheck className="text-blue-500 w-6 h-6" />
            <div>
              <p className="font-bold text-lg">Direct mail</p>
              <p className="text-gray-500 text-sm">Shipping via FedEx, UPS, etc.</p>
            </div>
            <span className="ml-auto text-sm text-gray-500">
              ETA {eta.split(" ").slice(0, 3).join(", ")}
            </span>
          </div>

          {/* 🔔 Shipping Notice */}
          {remaining > 0 && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-4 flex justify-between items-center">
              <span>
                Add ${remaining.toFixed(2)} for <strong>FREE SHIPPING</strong>
              </span>
              <button className="text-blue-600 hover:underline text-xs">
                Shop more →
              </button>
            </div>
          )}

          {/* 🎁 Gift Info */}
          <div className="bg-yellow-50 text-yellow-800 p-3 rounded-lg text-sm mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5" />
            <span>
                Sorry! The Konbini tote bag is out of stock right now.
                But don’t worry — more goodies are on the way!
            </span>
          </div>

          {/* 🧾 Cart Items */}
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-t py-4"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md object-cover border"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(decrementQuantity(item._id))}
                  className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded hover:bg-gray-300"
                >
                  <Minus size={16} />
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => dispatch(incrementQuantity(item._id))}
                  className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded hover:bg-gray-300"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="text-red-500 ml-3 hover:underline"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 📦 Right Side - Summary */}
      <div className="space-y-4">
        <div className="bg-white border rounded-xl shadow p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5 text-gray-500" />
            Summary
          </h3>

          <div className="flex justify-between text-sm mb-1">
            <span>Direct mail</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Items total</span>
            <span>${itemTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-red-500">
            <span>Delivery fee</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between font-bold text-lg">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {showCheckout && (
            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 w-full bg-emerald-500 text-white py-3 rounded-full hover:bg-emerald-600 transition"
            >
              Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
