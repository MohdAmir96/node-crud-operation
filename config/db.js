const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "ecommerce-project", // Specify the database name here
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
