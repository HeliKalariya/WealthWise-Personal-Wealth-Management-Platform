import Budget from '../models/Budget.js';

/** Return all budgets created by the logged-in user. */
export const getBudgets = async (request, response, next) => {
  try {
    const budgets = await Budget.find({ user: request.user._id }).sort({ category: 1 });
    response.json({ success: true, budgets });
  } catch (error) { next(error); }
};

/** Add a monthly category budget for the logged-in user. */
export const createBudget = async (request, response, next) => {
  try {
    const { category, amount, month } = request.body;
    if (!category || amount === undefined || !month) return response.status(400).json({ success: false, message: 'Category, amount and month are required.' });
    const budget = await Budget.create({ user: request.user._id, category, amount, month });
    response.status(201).json({ success: true, budget });
  } catch (error) { next(error); }
};

/** Edit one budget owned by the logged-in user. */
export const updateBudget = async (request, response, next) => {
  try {
    const budget = await Budget.findOneAndUpdate({ _id: request.params.id, user: request.user._id }, request.body, { new: true, runValidators: true });
    if (!budget) return response.status(404).json({ success: false, message: 'Budget not found.' });
    response.json({ success: true, budget });
  } catch (error) { next(error); }
};

/** Delete one budget owned by the logged-in user. */
export const deleteBudget = async (request, response, next) => {
  try {
    const budget = await Budget.findOneAndDelete({ _id: request.params.id, user: request.user._id });
    if (!budget) return response.status(404).json({ success: false, message: 'Budget not found.' });
    response.json({ success: true, message: 'Budget deleted.' });
  } catch (error) { next(error); }
};
