import { Router } from "express";
const router = Router();

import {
  createIncome,
  deleteIncomeById,
  getIncomeById,
  getIncomes,
  updateIncomeById,
} from "../controllers/admin/incomes.controller";

router.get("/", getIncomes);
router.post("/", createIncome);
router.get("/:id", getIncomeById);
router.post("/:id", updateIncomeById);
router.delete("/:id", deleteIncomeById);

export default router;
