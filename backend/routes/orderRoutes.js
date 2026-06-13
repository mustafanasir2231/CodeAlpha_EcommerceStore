import express from 'express';
const router = express.Router();

import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  createPaymentIntent,
} from '../controllers/orderController.js';

import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/create-payment-intent').post(protect, createPaymentIntent);

export default router;