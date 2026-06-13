import express from 'express';
import mongoose from 'mongoose'; 
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; // 1. Ye import zaroori hai
import productRoutes from './routes/productRoutes.js'; 
import orderRoutes from './routes/orderRoutes.js';
import dns from 'dns';

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes Mount/Register
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // 2. Ye line add karein
app.use('/api/products', productRoutes); 
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('Ecommerce API is running perfectly.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});