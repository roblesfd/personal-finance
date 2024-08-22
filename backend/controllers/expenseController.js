const Expense = require("../models/Expense");

// @desc Crear un gasto
// @route POST /gastos
// @access Private
const createExpense = async (req, res) => {
  const { amount, category, description, date, method, recurring, user } =
    req.body;

  if (!amount || !category || !method || !user) {
    return res.status(401).json({ message: "Campos obligatorio" });
  }

  try {
    const expense = new Expense({
      amount,
      category,
      description,
      date,
      method,
      recurring,
      user, // Asumiendo que el usuario autenticado está disponible en req.user
    });
    await expense.save();
    return res.status(201).json(expense);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el gasto", error });
  }
};

// @desc Obtener todos los gastos del usuario
// @route GET /gastos/usuario/:id
// @access Private
const getUserExpenses = async (req, res) => {
  const { id } = req.params;
  try {
    const expenses = await Expense.find({ user: id }).sort({
      date: -1,
    });
    return res.status(200).json(expenses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener los gastos", error });
  }
};

// @desc Obtener todos los gastos
// @route GET /gastos
// @access Private
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({
      date: -1,
    });
    return res.status(200).json(expenses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener los gastos", error });
  }
};

// @desc Obtener un gasto por ID
// @route GET /gastos/:id
// @access Private
const getExpenseById = async (req, res) => {
  const { id } = req.params;
  try {
    // const expense = await Expense.findOne({ _id: id, user: req.user._id });
    const expense = await Expense.findOne({ _id: id });
    if (!expense) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }
    return res.status(200).json(expense);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener el gasto", error });
  }
};

// @desc Actualizar un gasto
// @route PATCH /gastos/:id
// @access Private
const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, category, description, date, method, recurring } = req.body;

  try {
    if (!amount || !category || !method) {
      return res.status(401).json({ message: "Campos obligatorios" });
    }

    const expense = await Expense.findOneAndUpdate(
      //   { _id: id, user: req.user._id },
      { _id: id },
      { amount, category, description, date, method, recurring },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }

    return res.status(200).json(expense);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar el gasto", error });
  }
};

// @desc Eliminar un gasto
// @route DELETE /gastos/:id
// @access Private
const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findOneAndDelete({
      _id: id,
      //   user: req.user._id,
    });
    if (!expense) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }
    return res.status(200).json({ message: "Gasto eliminado exitosamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar el gasto", error });
  }
};

// @desc Filtrar gastos por rango de fechas
// @route GET /gastos/filter
// @access Private
const getExpensesByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  console.log(startDate, endDate);
  try {
    const expenses = await Expense.find({
      //   user: req.user._id,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).sort({ date: -1 });
    if (expenses.length > 0) {
      return res.status(200).json(expenses);
    }
    return res.status(401).json({ message: "No se encontraron gastos" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al filtrar los gastos", error });
  }
};

module.exports = {
  createExpense,
  getUserExpenses,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpensesByDateRange,
};
