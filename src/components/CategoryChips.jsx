// src/components/CategoryChips.jsx
const allSubcategories = {
  "Frozen Food": ["All", "Ice Cream", "Dumplings", "Frozen Veg", "Nuggets", "Fries"],
  "Snacks": ["All", "Chips", "Biscuits", "Chocolates", "Namkeen", "Energy Bars"],
  "Drinks": ["All", "Juice", "Soda", "Water", "Milk", "Coffee"],
  "Instant Food": ["All", "Cup Noodles", "Ready Meals", "Soup", "Oats", "Mixes"],
  // Add more categories if needed
};

export default function CategoryChips({ category, subcategory, setSubcategory }) {
  const subcategories = allSubcategories[category] || ["All"];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {subcategories.map((sub) => (
        <button
          key={sub}
          onClick={() => setSubcategory(sub)}
          className={`px-3 py-1 rounded-full border ${
            sub === subcategory
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
