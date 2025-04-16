import { Router } from "express";

import {
  createInvoices,
  deleteInvoice,
  getInvoices,
  updateInvoives,
} from "../../controllers/admin/invoice.controller";
import { accessByRole } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", createInvoices);
router.get("/", getInvoices);
router.post("/:id", updateInvoives);
router.delete("/:id", accessByRole(["admin"]), deleteInvoice);

export default router;
