import { Router } from "express";
import {
  createEvaluation,
  getEvaluations,
  updateEvaluation,
} from "../controllers/instructor/evaluation.controller";

const router = Router();

router.post("/", createEvaluation);
router.get("/", getEvaluations);
router.post("/updateEvaluation/:studentId/:dayNumber", updateEvaluation);

export default router;
