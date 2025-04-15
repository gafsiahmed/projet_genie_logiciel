import { Router } from "express";
import {
  createTraining,
  getTrainings,
} from "../controllers/admin/training.controller";

const router = Router();

router.post("/", createTraining);
router.get("/", getTrainings);

export default router;
