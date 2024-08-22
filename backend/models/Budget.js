const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: false, // Puede no tener categoría si es un presupuesto general
      enum: [
        "Alimento",
        "Transporte",
        "Entretenimiento",
        "Salud",
        "Educacion",
        "Renta",
        "Otro",
      ],
    },
    totalAmount: {
      type: Number,
      required: [true, "La cantidad total para el presupuesto es requerido"],
      min: [0, "La cantidad total es negativa"],
    },
    period: {
      type: String,
      required: [true, "El periodo es requerido"],
      enum: ["Diario", "Semanal", "Mensual", "Anual"], // Frecuencia del presupuesto
    },
    startDate: {
      type: Date,
      required: [true, "La fecha de inicio es requerida"],
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: [true, "La fecha de fin es requerida"],
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message:
          "La fecha de finalización no puede ser anterior a la fecha de inicio",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currentSpent: {
      type: Number,
      default: 0, // Acumula cuánto ha gastado el usuario en este presupuesto
      min: [0, "El gasto acumulado no puede ser negativo"],
    },
    alertThreshold: {
      type: Number,
      default: 80, // El porcentaje cuando el usuario recibe una alerta (ej. 80% del presupuesto gastado)
      min: [0, "El porcentaje limite no puede ser menor que 0%"],
      max: [100, "El porcentaje limite no puede ser mayor que 100%"],
    },
  },
  {
    timestamps: true,
  }
);

// Índices para búsquedas por usuario y periodo
BudgetSchema.index({ user: 1, period: 1 });
const Budget = mongoose.model("Budget", BudgetSchema);

module.exports = Budget;
