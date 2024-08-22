const express = require("express");
const expenseController = require("../controllers/expenseController");
// const authMiddleware = require('../middleware/auth'); // Middleware para autenticación

const router = express.Router();

// router
//   .route('/')
//   .post(authMiddleware, expenseController.createExpense)
//   .get(authMiddleware, expenseController.getAllExpenses);

// router.get('/filter', authMiddleware, expenseController.getExpensesByDateRange);

// router
//   .route('/:id')
//   .get(authMiddleware, expenseController.getExpenseById)
//   .patch(authMiddleware, expenseController.updateExpense)
//   .delete(authMiddleware, expenseController.deleteExpense);

router
  .route("/")
  .post(expenseController.createExpense)
  .get(expenseController.getAllExpenses);

router.get("/usuario/:id", expenseController.getUserExpenses);

router.get("/filter", expenseController.getExpensesByDateRange);

router
  .route("/:id")
  .get(expenseController.getExpenseById)
  .patch(expenseController.updateExpense)
  .delete(expenseController.deleteExpense);

module.exports = router;
