import React, { useState } from "react";

// Subcategories Component
function CategoryChips({ selectedCategory, selectedSub, onSelect }) {
  const allSubcategories = {
    "Frozen": ["All", "Ice Cream", "Dumplings", "Frozen Veg", "Nuggets", "Fries"],
    "Snacks": ["All", "Chips", "Biscuits", "Chocolates", "Namkeen", "Energy Bars"],
    "Instant": ["All", "Cup Noodles", "Ready Meals", "Soup", "Oats", "Mixes"],
    "Beverages": ["All", "Juice", "Soda", "Water", "Milk", "Coffee"],
  };

  const subcategories = allSubcategories[selectedCategory] || ["All"];

  return (
    <div className="flex flex-wrap gap-2 mb-4 px-4">
      {subcategories.map((sub) => (
        <button
          key={sub}
          onClick={() => onSelect(sub)}
          className={`px-3 py-1 rounded-full border ${
            sub === selectedSub
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {sub}
        </button>
      ))}
    </div>
  );
}