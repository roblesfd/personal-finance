const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      minLength: [6, "El nombre debe tener al menos 6 carácteres"],
      maxLength: [20, "El nombre debe tener máximo 20 carácteres"],
    },
    lastName: {
      type: String,
      minLength: [6, "El apellido debe tener al menos 6 carácteres"],
      maxLength: [20, "El apellido debe tener máximo 20 carácteres"],
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      match: [/^[a-zA-Z0-9]+@\S+\.\S+$/, "El correo electrónico no es válido"],
      unique: [true, "Ya hay una cuenta registrada con este correo"],
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
      min: [8, "La contraseña debe de tener al menos 8 carácteres"],
      max: [25, "La contraseña debe de tener al menos 25 carácteres"],
    },
    accountStatus: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
    },
    age: {
      type: Number,
      min: [18, "La edad mínima es 18 años"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    totalBalance: {
      type: Number,
      min: [0, "El balance no puede ser menor a cero"],
      default: 0.0,
    },
    currency: { type: String, enum: ["MXN", "USD"], default: "MXN" }, // Tipo de moneda preferida
    incomes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Income" }], // Relación con ingresos
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }], // Relación con gastos
    budgets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Budget" }], // Relación con presupuestos
  },
  {
    virtuals: {
      fullName: {
        get() {
          return `${this.name} ${this.lastName}`;
        },
      },
    },
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
