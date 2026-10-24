import { Router } from 'express';
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updatePaymentMethod,
  updateTransaction,
} from "../controllers/transactionController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.use(protect);
router.route('/').get(getTransactions).post(createTransaction);
router.patch('/:id/payment-method', updatePaymentMethod);
router.route('/:id').patch(updateTransaction).delete(deleteTransaction);

export default router;
