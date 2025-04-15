import { Router } from "express";

import {
  createDevis,
  deleteDevis,
  getDevis,
  updateDevis,
} from "../controllers/admin/devis.controller";

const router = Router();

router.post("/", createDevis);
router.get("/", getDevis);
router.post("/:id", updateDevis);
router.delete("/:id", deleteDevis);

export default router;
