const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");




router.get('/products', authMiddleware, productController.getProducts);

router.get("/products/:id", productController.getProductById);

router.post("/products", authMiddleware, productController.createProduct);

router.put("/products/:id", authMiddleware, productController.updateProduct);

router.delete("/products/:id", authMiddleware, productController.deleteProduct);

module.exports = router;
