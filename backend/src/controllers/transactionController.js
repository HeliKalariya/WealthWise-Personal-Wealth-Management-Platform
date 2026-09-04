import Transaction from '../models/Transaction.js';

/** List the logged-in user's transactions, optionally filtered by type. */
export const getTransactions = async (request, response, next) => {
  try {
    const filter = { user: request.user._id };
    if (request.query.type) filter.type = request.query.type;
    const transactions = await Transaction.find(filter).sort({ date: -1 });
    response.json({ success: true, transactions });
  } catch (error) { next(error); }
};

/** Save one new income or expense transaction for the logged-in user. */
export const createTransaction = async (request, response, next) => {
  try {
    const { type, category, amount, description, date } = request.body;
    if (!type || !category || amount === undefined || !description) return response.status(400).json({ success: false, message: 'Type, category, amount and description are required.' });
    const transaction = await Transaction.create({ user: request.user._id, type, category, amount, description, date });
    response.status(201).json({ success: true, transaction });
  } catch (error) { next(error); }
};

/** Update one transaction that belongs to the logged-in user. */
export const updateTransaction = async (request, response, next) => {
  try {
    const transaction = await Transaction.findOneAndUpdate({ _id: request.params.id, user: request.user._id }, request.body, { new: true, runValidators: true });
    if (!transaction) return response.status(404).json({ success: false, message: 'Transaction not found.' });
    response.json({ success: true, transaction });
  } catch (error) { next(error); }
};

/** Delete one transaction that belongs to the logged-in user. */
export const deleteTransaction = async (request, response, next) => {
  try {
    const transaction = await Transaction.findOneAndDelete({ _id: request.params.id, user: request.user._id });
    if (!transaction) return response.status(404).json({ success: false, message: 'Transaction not found.' });
    response.json({ success: true, message: 'Transaction deleted.' });
  } catch (error) { next(error); }
};
