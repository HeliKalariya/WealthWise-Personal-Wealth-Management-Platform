import { Router } from 'express';
import { createTransaction, deleteTransaction, getTransactions, updateTransaction } from '../controllers/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.use(protect);
router.route('/').get(getTransactions).post(createTransaction);
router.route('/:id').patch(updateTransaction).delete(deleteTransaction);

export default router;
