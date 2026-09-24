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
    let monthlyBudgetSpent = 0;
    let saved = 0;
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    for (const transaction of transactions) {
      if (transaction.type === 'income') income += transaction.amount;
      if (transaction.type === 'expense') {
        expenses += transaction.amount;
        if (new Date(transaction.date).toISOString().slice(0, 7) === currentMonth) monthlyBudgetSpent += transaction.amount;
      }
    }

    // A monthly budget only counts against expenses recorded in that same month.
    for (const budget of budgets) if (budget.month === currentMonth) budgeted += budget.amount;
    for (const goal of goals) saved += goal.current;

    // Prepare eight monthly points so the dashboard line chart has a stable timeline.
    const monthlyMap = new Map();
    for (let offset = 7; offset >= 0; offset -= 1) {
      const date = new Date();
      date.setDate(1);
      date.setMonth(date.getMonth() - offset);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      monthlyMap.set(key, { month: date.toLocaleString('en-IN', { month: 'short' }), income: 0, expenses: 0 });
    }

    // Add each saved transaction to its income or expense monthly chart value.
    const categories = {};
    for (const transaction of transactions) {
      const date = new Date(transaction.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      if (monthlyMap.has(key)) monthlyMap.get(key)[transaction.type === 'income' ? 'income' : 'expenses'] += transaction.amount;
      if (transaction.type === 'expense') categories[transaction.category] = (categories[transaction.category] || 0) + transaction.amount;
    }

    response.json({ success: true, summary: { totalBalance: income - expenses, income, expenses, netWorth: income - expenses + saved, budgeted, monthlyBudgetSpent, remainingBudget: budgeted - monthlyBudgetSpent }, recentTransactions: transactions.slice(0, 6), budgets, goals, monthlyChart: [...monthlyMap.values()], expenseCategories: Object.entries(categories).map(([name, value]) => ({ name, value })) });
  } catch (error) { next(error); }
};
