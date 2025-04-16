import { Router } from "express";
import {
  createExpenses,
  deleteExpensesById,
  getExpenses,
  getExpensesById,
  updateExpensesById,
} from "../../controllers/admin/expenses.controller";

const router = Router();

router.get("/", getExpenses);
router.post("/", createExpenses);
router.get("/:id", getExpensesById);
router.post("/:id", updateExpensesById);
router.delete("/:id", deleteExpensesById);

export default router;
