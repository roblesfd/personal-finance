const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "La cantidad es requerida"],
      min: [0, "La cantidad no puede ser negativa"],
    },
    category: {
      type: String,
      required: [true, "La categoría es requerida"],
      enum: ["Salario", "Inversión", "Regalo", "Bono", "Interés", "Otro"], // Categorías predefinidas
    },
    description: {
      type: String,
      maxlength: [255, "La descripción no puede superar los 255 carácteres"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    method: {
      type: String,
      enum: [
        "Efectivo",
        "Transferencia bancaria",
        "Tarjeta de crédito",
        "Otro",
      ], // Métodos de ingreso
      required: [true, "El método de pago es requerido"],
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

// Índices para optimización en búsquedas por usuario y fecha
IncomeSchema.index({ user: 1, date: -1 });

const Income = mongoose.model("Income", IncomeSchema);

module.exports = Income;
