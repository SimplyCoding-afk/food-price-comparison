const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

console.log("Attempting to connect to MongoDB...");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    console.log("Database:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// Routes
const foodRoutes = require("./routes/foodRoutes");

app.use("/api/foods", foodRoutes);

// Health check (optional but useful)
app.get("/", (req, res) => {
  res.send("FoodCompare Backend is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
