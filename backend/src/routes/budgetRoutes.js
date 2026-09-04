import { Router } from 'express';
import { createBudget, deleteBudget, getBudgets, updateBudget } from '../controllers/budgetController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.use(protect);
router.route('/').get(getBudgets).post(createBudget);
router.route('/:id').patch(updateBudget).delete(deleteBudget);

export default router;
