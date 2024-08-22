const Income = require("../models/Income"); // Asegúrate de importar tu modelo

// @desc Crear un nuevo ingreso
// @route POST /ingresos
// @access Private
const createIncome = async (req, res) => {
  try {
    const { amount, category, description, date, method, user } = req.body;

    const income = new Income({
      amount,
      category,
      description,
      date,
      method,
      user,
    });

    await income.save();
    return res.status(201).json(income);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear ingreso", error });
  }
};

// @desc Obtener todos los ingresos de un usuario
// @route POST /ingresos/usuario/:id
// @access Private
const getUserIncomes = async (req, res) => {
  const { id } = req.params;
  try {
    const incomes = await Income.find({ user: id }).sort({
      date: -1,
    });
    if (incomes.length > 0) {
      return res.status(200).json(incomes);
    }
    return res.status(401).json({ message: "No se encontraron ingresos" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al recuperar ingresos", error });
  }
};

// @desc Obtener todos los ingresos
// @route GET /ingresos/
// @access Private
const getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find().sort({
      date: -1,
    });
    return res.status(200).json(incomes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al recuperar ingresos", error });
  }
};

// @desc Obtener un ingreso por ID
// @route POST /ingresos/:id
// @access Private
const getIncomeById = async (req, res) => {
  try {
    const income = await Income.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!income) {
      return res.status(404).json({ message: "Ingreso no encontrado" });
    }
    return res.status(200).json(income);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al recuperar ingreso", error });
  }
};

// @desc Actualizar un ingreso
// @route PATCH /ingresos/:id
// @access Private
const updateIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const { amount, category, description, date, method, user } = req.body;

    if (!amount || !category || !method) {
      return res.status(401).json({ message: "Campos obligatorios" });
    }

    // const income = await Income.findOneAndUpdate(
    //   { _id: id, user },
    //   { amount, category, description, date, method },
    //   { new: true, runValidators: true }
    // );
    const income = await Income.findOneAndUpdate(
      { _id: id },
      { amount, category, description, date, method },
      { new: true, runValidators: true }
    );

    if (!income) {
      return res.status(404).json({ message: "Ingreso no encontrado" });
    }

    return res.status(200).json(income);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar ingreso", error });
  }
};

// @desc Eliminar un ingreso
// @route DELETE /ingresos/:id
// @access Private
const deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    // const income = await Income.findOneAndDelete({
    //   _id: req.params.id,
    //   user: req.user._id,
    // });
    const income = await Income.findOneAndDelete({
      _id: id,
    });
    if (!income) {
      return res.status(404).json({ message: "Ingreso no encontrado" });
    }
    return res.status(200).json({ message: "Ingreso eliminado exitosamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar el ingreso", error });
  }
};

// Filtrar ingresos por rango de fechas
// @desc Eliminar un ingreso
// @route GET /ingresos/filter
// @access Private
const getIncomesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query; // Ejemplo: ?startDate=2024-01-01&endDate=2024-12-31
    const incomes = await Income.find({
      user: req.user._id,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).sort({ date: -1 });

    return res.status(200).json(incomes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al filtrar ingresos", error });
  }
};

module.exports = {
  createIncome,
  getUserIncomes,
  getAllIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome,
  getIncomesByDateRange,
};
