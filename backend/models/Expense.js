const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "El monto es requerido"],
      min: [0, "La cantidad no puede ser negativa"],
    },
    category: {
      type: String,
      required: [true, "La categoria es requerida"],
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
    description: {
      type: String,
      maxlength: [255, "La descripción no puede superar los 255 carácteres"],
      default: "",
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
        "Tárjeta de crédito",
        "Tárjeta de debito",
        "Transferencia bancaria",
        "Otro",
      ],
      required: [true, "El método de pago es requerido"],
    },
    recurring: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Índices para optimizar búsquedas por usuario y categoría
ExpenseSchema.index({ user: 1, category: 1 });

module.exports = mongoose.model("Expense", ExpenseSchema);
