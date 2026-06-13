import express from 'express';
import { getProducts, createProduct, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import Product from '../models/productModel.js';

const router = express.Router();

// Seed Route
router.get('/seed', async (req, res) => {
    try {
        await Product.deleteMany({});
        const newProducts = [
            { name: 'Wireless Headphones', description: 'Immersive sound.', price: 199.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', category: 'Electronics', countInStock: 10 },
            { name: 'Gaming Mouse', description: 'High-precision.', price: 59.99, image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7', category: 'Electronics', countInStock: 22 }
        ];
        await Product.insertMany(newProducts);
        res.json({ message: 'Success!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Routes
router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router.route('/:id').get(getProductById).put(protect, isAdmin, updateProduct).delete(protect, isAdmin, deleteProduct);

export default router; // <--- Yeh line export default hai, jo error fix karegi