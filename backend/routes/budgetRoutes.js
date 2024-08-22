const express = require("express");
const budgetController = require("../controllers/budgetController");
// const authMiddleware = require("../middleware/auth"); // Middleware para autenticación

const router = express.Router();

// router
//   .route("/")
//   .post(authMiddleware, budgetController.createBudget)
//   .get(authMiddleware, budgetController.getAllBudgets);

// router.get("/filter", authMiddleware, budgetController.getBudgetsByDateRange);

// router
//   .route("/:id")
//   .get(authMiddleware, budgetController.getBudgetById)
//   .patch(authMiddleware, budgetController.updateBudget)
//   .delete(authMiddleware, budgetController.deleteBudget);

router
  .route("/")
  .post(budgetController.createBudget)
  .get(budgetController.getAllBudgets);

router.get("/usuario/:id", budgetController.getUserBudgets);

router.get("/filter", budgetController.getBudgetsByDateRange);

router
  .route("/:id")
  .get(budgetController.getBudgetById)
  .patch(budgetController.updateBudget)
  .delete(budgetController.deleteBudget);

module.exports = router;
