import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Route ko protect karne ke liye middleware (Check karega token sahi hai ya nahi)
export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Header se token nikalna ("Bearer token_string")
            token = req.headers.authorization.split(' ')[1];

            // Token ko verify karna
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // User ka data request object mein daalna (bina password ke)
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Admin check karne ke liye middleware
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};