import React, { useState } from "react";

// Subcategory Component
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

// Main Component
export default function CategoryBar() {
  const [selectedCategory, setSelectedCategory] = useState("Snacks");
  const [selectedSub, setSelectedSub] = useState("All");

  const categories = [
    {
      name: "Snacks",
      image:
        "https://img08.weeecdn.net/category/image/general_v2/ch/Snacks_ch_inactive.png!c120x120.auto",
    },
    {
      name: "Frozen",
      image:
        "https://img08.weeecdn.net/category/image/general_v2/ch/Frozen_ch_inactive.png!c120x120.auto",
    },
    {
      name: "Instant",
      image:
        "https://img08.weeecdn.net/category/image/general_v2/ch/Instant_ch_inactive.png!c120x120.auto",
    },
    {
      name: "Beverages",
      image:
        "https://img08.weeecdn.net/category/image/general_v2/ch/Beverages_ch_inactive.png!c120x120.auto",
    },
  ];

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setSelectedSub("All");
  };

  return (
    <>
      {/* Category Bar */}
      <div className="sticky top-0 z-[30] bg-white shadow overflow-x-auto whitespace-nowrap py-3 px-4 border-gray-300 border-b">
        <div className="flex gap-4 min-w-full w-max">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategorySelect(cat.name)}
              className={`flex flex-col items-center px-5 py-1 rounded-lg transition-all ${
                selectedCategory === cat.name
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-8 h-8 object-contain mb-1"
              />
              <span className="text-xs">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Subcategory Chips */}
      <CategoryChips
        selectedCategory={selectedCategory}
        selectedSub={selectedSub}
        onSelect={setSelectedSub}
      />
    </>
  );
}
