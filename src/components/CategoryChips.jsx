const subcategoryMap = {
  Frozen: [
    "Appetizers & Snacks",
    "Dumplings",
    "Buns",
    "Pancakes",
    "Meals & Entrees",
    "Seafood & Fish Balls",
  ],
  Snacks: [
    "Chips & Crackers",
    "Cookies",
    "Nuts & Seeds",
    "Puffs",
    "Seaweed Snacks",
  ],
  Instant: [
    "Instant Noodles",
    "Curry Packs",
    "Ready Meals",
    "Rice Bowls",
    "Instant Pasta",
  ],
  Beverages: [
    "Milk Tea",
    "Fruit Juice",
    "Soda",
    "Energy Drinks",
    "Coffee",
  ],
  Seasoning: [
    "Soy Sauce",
    "Chili Oil",
    "Vinegar",
    "Cooking Wine",
    "Salt & Pepper",
  ],
  "Dry Goods": [
    "Dried Noodles",
    "Seaweed",
    "Mushrooms",
    "Rice",
    "Beans",
  ],
  Household: [
    "Cleaning Tools",
    "Laundry Supplies",
    "Paper Towels",
    "Storage",
    "Trash Bags",
  ],
  Bakery: [
    "Bread",
    "Pastries",
    "Cakes",
    "Buns",
    "Rolls",
  ],
  Canned: [
    "Canned Tuna",
    "Canned Corn",
    "Canned Soup",
    "Canned Fruit",
    "Condensed Milk",
  ],
  "Self Care": [
    "Face Masks",
    "Lotions",
    "Hair Care",
    "Toothpaste",
    "Body Wash",
  ],
  Seafood: [
    "Shrimp",
    "Squid",
    "Fish Fillets",
    "Crab",
    "Seafood Mix",
  ],
  "Dairy & Eggs": [
    "Milk",
    "Cheese",
    "Butter",
    "Yogurt",
    "Eggs",
  ],
  "Tofu & Vegan": [
    "Tofu Blocks",
    "Soy Milk",
    "Vegan Meat",
    "Tempeh",
    "Plant-Based Snacks",
  ],
  Health: [
    "Vitamins",
    "Supplements",
    "Health Drinks",
    "Herbal",
    "Protein Bars",
  ],
};

export default function CategoryChips({ selectedCategory, selectedSub, onSelect }) {
  const chips = subcategoryMap[selectedCategory] || [];

  return (
    <div className="flex gap-3 overflow-x-auto py-4 px-2 scrollbar-hide">
      <button
        onClick={() => onSelect("All")}
        className={`px-4 py-2 rounded-full text-sm font-medium border shadow-sm whitespace-nowrap transition ${
          selectedSub === "All"
            ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg scale-105"
            : "bg-white hover:bg-gray-100 text-gray-700"
        }`}
      >
        All
      </button>

      {chips.map((type) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className={`px-4 py-2 rounded-full text-sm font-medium border shadow-sm whitespace-nowrap transition ${
            selectedSub === type
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg scale-105"
              : "bg-white hover:bg-gray-100 text-gray-700"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
