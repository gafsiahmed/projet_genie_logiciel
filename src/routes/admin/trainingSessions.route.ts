import { Router } from "express";

import {
  createTrainingSession,
  deleteTrainingSession,
  getTrainingSessionById,
  getTrainingSessions,
  getTrainingSessionsByInstructorId,
  updateTrainingSession,
} from "../../controllers/admin/trainingSessions.controller";

const router = Router();

router.get("/", getTrainingSessions);
router.get("/:id", getTrainingSessionById);
router.post("/sessions", getTrainingSessionsByInstructorId);
router.post("/", createTrainingSession);
router.post("/:id", updateTrainingSession);
router.delete("/:id", deleteTrainingSession);

export default router;
