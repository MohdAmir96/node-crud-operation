// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/products", productController.createProduct);
router.get("/products/:id", productController.getProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);
router.get("/allProducts", productController.getAllProducts);

module.exports = router;
