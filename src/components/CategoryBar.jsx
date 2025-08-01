import React from "react";
const [selectedCategory, setSelectedCategory] = useState("Snacks");

const categories = [
  { name: "Snacks", image: "https://img08.weeecdn.net/category/image/general_v2/ch/Snacks_ch_inactive.png!c120x120.auto" },
    { name: "Frozen", image: "https://img08.weeecdn.net/category/image/general_v2/ch/Frozen_ch_inactive.png!c120x120.auto" },
  { name: "Instant", image: "https://img08.weeecdn.net/category/image/general_v2/ch/Instant_ch_inactive.png!c120x120.auto" },
  { name: "Beverages", image: "https://img08.weeecdn.net/category/image/general_v2/ch/Beverages_ch_inactive.png!c120x120.auto" },
  { name: "Seasoning", image: "https://img08.weeecdn.net/category/image/general_v2/ch/Seasoning_ch_inactive.png!c120x120.auto" },
  { name: "Dry Goods", image: "https://img08.weeecdn.net/category/image/general_v2/ch/Dry_Goods_ch_inactive.png!c120x120.auto" },
  { name: "Household", image: "https://img08.weeecdn.net/category/image/general_v2/ch/Household_ch_inactive.png!c120x120.auto" },
  { name: "Bakery", image: "https://img08.weeecdn.net/category/image/general_v2/ch/Bakery_ch_inactive.png!c120x120.auto" },
  { name: "Canned", image: "https://img08.weeecdn.net/category/image/general_v2/ch/Canned_ch_inactive.png!c120x120.auto" },
  { name: "Self Care", image: "https://img08.weeecdn.net/category/image/general_v2/ch/Self_Care_ch_inactive.png!c120x120.auto" },
  { name: "Seafood", image: "https://img08.weeecdn.net/category/image/general_v2/ch/Seafood_ch_inactive.png!c120x120.auto" },
  { name: "Dairy & Eggs", image: "https://img08.weeecdn.net/category/image/general_v2/ch/Dairy_Eggs_ch_inactive.png!c120x120.auto" },
  { name: "Tofu & Vegan", image: "https://img08.weeecdn.net/category/image/general_v2/ch/Tofu_Vegan_ch_inactive.png!c120x120.auto" },
  { name: "Health", image: "https://img08.weeecdn.net/category/image/general_v2/ch/Health_ch_inactive.png!c120x120.auto" },
];

export default function CategoryBar(){
    const [selectedCategory, setSelectedCategory] = useState("Snacks"); // ✅ Use inside component


 {
  return (
    <div className="sticky top-0 z-[30] bg-white shadow overflow-x-auto whitespace-nowrap py-3 px-4 border-gray-300 border-b">
      <div className="flex gap-4 min-w-full w-max">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onSelect(cat.name)}
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
  );
}
