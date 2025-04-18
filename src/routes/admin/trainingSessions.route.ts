import { Router } from "express";
import { TrainingSessionController } from "../../presentation/controllers/TrainingSessionController";

const router = Router();
const trainingSessionController = new TrainingSessionController();

// Get all training sessions
router.get("/",  trainingSessionController.getTrainingSessions);

// Get training session by ID
router.get("/:id",  trainingSessionController.getTrainingSessionById);

// // Get training sessions by instructor email
// router.post("/sessions", trainingSessionController.getTrainingSessionsByInstructorId);

// Create a training session
router.post("/",  trainingSessionController.createTrainingSession);

// Update training session (changed from POST to PUT)
router.put("/:id",  trainingSessionController.updateTrainingSession);

// Delete training session
router.delete("/:id",  trainingSessionController.deleteTrainingSession);

export default router;
