import { Router } from 'express';
import { createGoal, deleteGoal, getGoals, updateGoal } from '../controllers/goalController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.use(protect);
router.route('/').get(getGoals).post(createGoal);
router.route('/:id').patch(updateGoal).delete(deleteGoal);

export default router;
