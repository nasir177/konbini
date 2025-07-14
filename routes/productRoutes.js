import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ✅ GET /api/products?category=&subcategory=&search=
router.get("/", async (req, res) => {
  try {
    const { category, subcategory, search } = req.query;
    const filter = [];

    if (category) {
      filter.push({ category: new RegExp(`^${escapeRegex(category)}$`, "i") });
    }

    if (subcategory) {
      filter.push({
        subcategory: new RegExp(`^${escapeRegex(subcategory)}$`, "i"),
      });
    }

    if (search) {
      const searchRegex = new RegExp(escapeRegex(search), "i");
      filter.push({
        $or: [
          { name: searchRegex },
          { category: searchRegex },
          { subcategory: searchRegex },
        ],
      });
    }

    const query = filter.length > 0 ? { $and: filter } : {};

    console.log("👉 Filter used:", JSON.stringify(query, null, 2));

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ ADD THIS BELOW
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("❌ Error fetching product by ID:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;
