// app.js
const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

// Load environment variables from .env file
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
