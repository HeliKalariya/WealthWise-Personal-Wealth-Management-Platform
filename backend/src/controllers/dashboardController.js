import Transaction from '../models/Transaction.js';
import Budget from '../models/Budget.js';
import Goal from '../models/Goal.js';

/** Build all dashboard totals from the logged-in user's MongoDB records. */
export const getDashboard = async (request, response, next) => {
  try {
    const user = request.user._id;
    const [transactions, budgets, goals] = await Promise.all([
      Transaction.find({ user }).sort({ date: -1 }),
      Budget.find({ user }),
      Goal.find({ user }).sort({ targetDate: 1 }),
    ]);
    let income = 0;
    let expenses = 0;
    let budgeted = 0;
    let saved = 0;

    for (const transaction of transactions) {
      if (transaction.type === 'income') income += transaction.amount;
      if (transaction.type === 'expense') expenses += transaction.amount;
    }

    for (const budget of budgets) budgeted += budget.amount;
    for (const goal of goals) saved += goal.current;
    response.json({ success: true, summary: { totalBalance: income - expenses, income, expenses, netWorth: income - expenses + saved, budgeted, remainingBudget: budgeted - expenses }, recentTransactions: transactions.slice(0, 6), budgets, goals });
  } catch (error) { next(error); }
};
