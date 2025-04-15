import { Router } from "express";
import {
  createTransaction,
  deleteTransactionById,
  getTransactionById,
  getTransactions,
  updateTransactionById,
} from "../controllers/admin/transactions.controller";

const router = Router();

router.get("/", getTransactions);
router.post("/", createTransaction);
router.get("/:id", getTransactionById);
router.post("/:id", updateTransactionById);
router.delete("/:id", deleteTransactionById);

export default router;
