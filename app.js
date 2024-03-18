// app.js
const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const jwt = require("jsonwebtoken");

// Load environment variables from .env file
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Token verification middleware
app.use((req, res, next) => {
  const token = req.headers.authorization;
  console.log(">>>>>>>>>>>>>>>>>>", req.path);
  // Exclude token verification for login and signup routes
  if (req.path === "/api/login" || req.path === "/api/signup") {
    return next();
  }

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ message: "Token expired" });
      }
      return res.status(403).json({ message: "Invalid token" });
    }

    // Attach the decoded user ID to the request object for use in subsequent route handlers
    req.userId = decoded.userId;
    next();
  });
});

app.use("/api", productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "User not found" });
  }
  next(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
