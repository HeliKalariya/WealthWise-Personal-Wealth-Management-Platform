import Goal from '../models/Goal.js';

/** Return all financial goals created by the logged-in user. */
export const getGoals = async (request, response, next) => {
  try {
    const goals = await Goal.find({ user: request.user._id }).sort({ targetDate: 1 });
    response.json({ success: true, goals });
  } catch (error) { next(error); }
};

/** Create one financial goal for the logged-in user. */
export const createGoal = async (request, response, next) => {
  try {
    const { name, target, current, targetDate, category } = request.body;
    if (!name || !target || !targetDate) return response.status(400).json({ success: false, message: 'Name, target and target date are required.' });
    const goal = await Goal.create({ user: request.user._id, name, target, current, targetDate, category });
    response.status(201).json({ success: true, goal });
  } catch (error) { next(error); }
};

/** Update a goal or add saved progress to a goal owned by the user. */
export const updateGoal = async (request, response, next) => {
  try {
    const goal = await Goal.findOneAndUpdate({ _id: request.params.id, user: request.user._id }, request.body, { new: true, runValidators: true });
    if (!goal) return response.status(404).json({ success: false, message: 'Goal not found.' });
    response.json({ success: true, goal });
  } catch (error) { next(error); }
};

/** Delete a goal owned by the logged-in user. */
export const deleteGoal = async (request, response, next) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: request.params.id, user: request.user._id });
    if (!goal) return response.status(404).json({ success: false, message: 'Goal not found.' });
    response.json({ success: true, message: 'Goal deleted.' });
  } catch (error) { next(error); }
};
