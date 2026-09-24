import Transaction from "../models/Transaction.js";

const expenseCategories = [
  "Food",
  "Travel",
  "Shopping",
  "Entertainment",
  "Bills",
  "Healthcare",
  "Education",
  "Others",
];

/** Validate simple transaction fields before data is saved to MongoDB. */
const validateTransaction = ({ type, category, amount, description, date }) => {
  if (!["income", "expense"].includes(type))
    return "Transaction type must be income or expense.";
  if (!category?.trim()) return "Please select or enter a category.";
  if (type === "expense" && !expenseCategories.includes(category))
    return "Please select a valid expense category.";
  if (!Number.isFinite(Number(amount)) || Number(amount) <= 0)
    return "Amount must be greater than 0.";
  if (!description?.trim()) return "Description is required.";
  if (date && Number.isNaN(new Date(date).getTime()))
    return "Enter a valid date.";
  return null;
};

/** List the logged-in user's transactions, optionally filtered by type. */
export const getTransactions = async (request, response, next) => {
  try {
    const filter = { user: request.user._id };
    if (request.query.type) filter.type = request.query.type;
    const transactions = await Transaction.find(filter).sort({ date: -1 });
    response.json({ success: true, transactions });
  } catch (error) {
    next(error);
  }
};

/** Save one new income or expense transaction for the logged-in user. */
export const createTransaction = async (request, response, next) => {
  try {
    const { type, category, amount, description, date } = request.body;
    const validationError = validateTransaction({
      type,
      category,
      amount,
      description,
      date,
    });
    if (validationError)
      return response
        .status(400)
        .json({ success: false, message: validationError });
    const transaction = await Transaction.create({
      user: request.user._id,
      type,
      category: category.trim(),
      amount: Number(amount),
      description: description.trim(),
      date,
    });
    response.status(201).json({ success: true, transaction });
  } catch (error) {
    next(error);
  }
};

/** Update one transaction that belongs to the logged-in user. */
export const updateTransaction = async (request, response, next) => {
  try {
    const existingTransaction = await Transaction.findOne({
      _id: request.params.id,
      user: request.user._id,
    });
    if (!existingTransaction)
      return response
        .status(404)
        .json({ success: false, message: "Transaction not found." });
    const updatedValues = {
      ...existingTransaction.toObject(),
      ...request.body,
    };
    const validationError = validateTransaction(updatedValues);
    if (validationError)
      return response
        .status(400)
        .json({ success: false, message: validationError });
    const transaction = await Transaction.findByIdAndUpdate(
      request.params.id,
      {
        ...request.body,
        category: updatedValues.category.trim(),
        description: updatedValues.description.trim(),
        amount: Number(updatedValues.amount),
      },
      { new: true, runValidators: true },
    );
    response.json({ success: true, transaction });
  } catch (error) {
    next(error);
  }
};

/** Delete one transaction that belongs to the logged-in user. */
export const deleteTransaction = async (request, response, next) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: request.params.id,
      user: request.user._id,
    });
    if (!transaction)
      return response
        .status(404)
        .json({ success: false, message: "Transaction not found." });
    response.json({ success: true, message: "Transaction deleted." });
  } catch (error) {
    next(error);
  }
};
