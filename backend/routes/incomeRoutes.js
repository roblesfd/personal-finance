const express = require("express");
const incomeController = require("../controllers/incomeController");
// const authMiddleware = require("../middleware/auth"); // Middleware de autenticación

const router = express.Router();

// router.post("/incomes", authMiddleware, incomeController.createIncome);
// router.get("/incomes", authMiddleware, incomeController.getIncomes);
// router.get("/incomes/:id", authMiddleware, incomeController.getIncomeById);
// router.put("/incomes/:id", authMiddleware, incomeController.updateIncome);
// router.delete("/incomes/:id", authMiddleware, incomeController.deleteIncome);
// router.get(
//   "/incomes/filter",
//   authMiddleware,
//   incomeController.getIncomesByDateRange
// );
router
  .route("/")
  .post(incomeController.createIncome)
  .get(incomeController.getAllIncomes);

router.get("/usuario/:id", incomeController.getUserIncomes);

router
  .route("/:id")
  .get(incomeController.getIncomeById)
  .patch(incomeController.updateIncome)
  .delete(incomeController.deleteIncome);

router.get("/filter", incomeController.getIncomesByDateRange);

module.exports = router;
