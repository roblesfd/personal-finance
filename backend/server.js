require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT ? process.env.PORT : 3500;
const path = require("path");
const connectDB = require("./config/dbConnection");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

/**
 * TODO
 * conexion db x
 * evenbtos db x
 * loggers
 *  - logger requests
 * rutas
 * control cors x
 * limite de archivos de subida x
 * -permitir subir archivos json x
    -permitir el uso de cookies x
    -configurar ruta de archivos estaticos x
    -permitir subir archivos json x
    -permitir el uso de cookies x
    -configurar ruta de archivos estaticos x
    -configurar ruta de archivos estaticos x
    -manejo de eventos conexion db x
 * 
 */
connectDB();
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "6mb", extended: true }));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(logger);

// Rutas
app.use("/auth", require("./routes/authRoutes"));
app.use("/usuarios", require("./routes/userRoutes"));
app.use("/ingresos", require("./routes/incomeRoutes"));
app.use("/gastos", require("./routes/expenseRoutes"));
app.use("/presupuestos", require("./routes/budgetRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  }
});

app.use(errorHandler);

mongoose.connection.on("open", () => {
  console.log("Conectado a MongoDB");
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.type}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
