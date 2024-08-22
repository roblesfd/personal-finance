const Budget = require("../models/Budget");

// @desc Crear un presupuesto
// @route POST /presupuestos
// @access Private
const createBudget = async (req, res) => {
  const { totalAmount, category, period, startDate, endDate, user } = req.body;

  try {
    // if (
    //   !totalAmount ||
    //   !category ||
    //   !period ||
    //   !startDate ||
    //   !endDate ||
    //   !user
    // ) {
    //   return res.status(401).json({ message: "Campos obligatorio" });
    // }
    const budget = new Budget({
      totalAmount,
      period,
      category,
      startDate,
      endDate,
      user,
    });
    await budget.save();
    return res.status(201).json(budget);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear el presupuesto", error });
  }
};

// @desc Obtener todos los presupuestos del usuario
// @route GET /presupuestos
// @access Private
const getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find().sort({
      periodEnd: -1,
    });
    if (budgets.length > 0) {
      return res.status(200).json(budgets);
    }
    return res.status(401).json({ message: "No se encontraron presupuestos" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener los presupuestos", error });
  }
};

// @desc Obtener un presupuesto por ID
// @route GET /presupuestos/:id
// @access Private
const getBudgetById = async (req, res) => {
  const { id } = req.params;
  try {
    const budget = await Budget.findOne(
      // { _id: id, user: req.user._id }
      { _id: id }
    );
    if (!budget) {
      return res.status(404).json({ message: "Presupuesto no encontrado" });
    }
    return res.status(200).json(budget);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener el presupuesto", error });
  }
};

// @desc Obtener un presupuesto por ID
// @route GET /presupuestos/:id
// @access Private
const getUserBudgets = async (req, res) => {
  const { id } = req.params;
  try {
    const budgets = await Budget.find({ user: id });
    if (!budgets) {
      return res.status(404).json({ message: "No tienes presupuestos" });
    }
    return res.status(200).json(budgets);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener los presupuestos", error });
  }
};

// @desc Actualizar un presupuesto
// @route PATCH /presupuestos/:id
// @access Private
const updateBudget = async (req, res) => {
  const { id } = req.params;
  const { totalAmount, category, startDate, endDate } = req.body;

  try {
    if (!totalAmount || !category || !startDate || !endDate) {
      return res.status(401).json({ message: "Campos obligatorios" });
    }
    const budget = await Budget.findOne(
      //   { _id: id, user: req.user._id },
      { _id: id }
      //   { totalAmount, category, startDate, endDate },
      //   { new: true, runValidators: true }
    );

    if (!budget) {
      return res.status(404).json({ message: "Presupuesto no encontrado" });
    }
    budget.totalAmount = totalAmount;
    budget.category = category;
    budget.startDate = startDate;
    budget.endDate = endDate;

    const result = await budget.save();
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar el presupuesto", error });
  }
};

// @desc Eliminar un presupuesto
// @route DELETE /presupuestos/:id
// @access Private
const deleteBudget = async (req, res) => {
  const { id } = req.params;
  try {
    const budget = await Budget.findOneAndDelete({
      _id: id,
      //   user: req.user._id,
    });
    if (!budget) {
      return res.status(404).json({ message: "Presupuesto no encontrado" });
    }
    return res
      .status(200)
      .json({ message: "Presupuesto eliminado exitosamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar el presupuesto", error });
  }
};

// @desc Filtrar presupuestos por rango de fechas
// @route GET /presupuestos/filter
// @access Private
const getBudgetsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const budgets = await Budget.find({
      //   user: req.user._id,
      startDate: { $gte: new Date(startDate) },
      endDate: { $lte: new Date(endDate) },
    }).sort({ periodEnd: -1 });

    if (budgets.length > 0) {
      return res.status(200).json(budgets);
    }
    return res.status(401).json({
      message:
        "No se encontraron presupuesto en el rango de fecha especificado",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al filtrar los presupuestos", error });
  }
};

module.exports = {
  createBudget,
  getAllBudgets,
  getBudgetById,
  getUserBudgets,
  updateBudget,
  deleteBudget,
  getBudgetsByDateRange,
};
