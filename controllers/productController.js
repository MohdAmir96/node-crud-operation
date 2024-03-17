// controllers/productController.js
const Product = require("../models/Product");

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
};
