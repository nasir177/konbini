import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js"; // ✅ Import your routes

dotenv.config();

const app = express();

app.use(cors());           // ✅ Enable CORS
app.use(express.json());   // ✅ Parse incoming JSON

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Register route for products
app.use("/api/products", productRoutes);

// ✅ Root route (optional)
app.get("/", (req, res) => {
  res.send("Konbini API is running!");
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
