// controllers/productController.js
const Product = require("../models/Product");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
module.exports = {
  async createProduct(req, res) {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error("Error saving product:", error);
      res.status(500).json({ error: "Error saving product" });
    }
  },

  async getAllProducts(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Error fetching products" });
    }
  },

  async getProduct(req, res) {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Error fetching product" });
    }
  },

  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const updates = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updates,
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Error updating product" });
    }
  },

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(deletedProduct);
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Error deleting product" });
    }
  },

  /************************************************************************SIGNUP/LOGIN************************************************************************/

  async signup(req, res) {
    const { username, password, email } = req.body;

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email address");
    }

    const newUser = new User({ username, password, email });
    await newUser.save();
    res.status(201).send("User registered");
  },
  async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).send("Invalid username or password");
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY); // Change 'secret_key' to your secret key
    res.json({ token });
  },
};
