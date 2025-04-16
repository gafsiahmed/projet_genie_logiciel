import { Router } from "express";
const router = Router();

import {
  createPayment,
   deletePaymentById,
   getPaymentById,
  getPayments,
    updatePaymentById,
} from "../../controllers/admin/payments.controller";

router.get("/", getPayments);

router.post("/", createPayment);
 router.get("/:id", getPaymentById);
 router.post("/:id", updatePaymentById);
 router.delete("/:id", deletePaymentById);

export default router;
