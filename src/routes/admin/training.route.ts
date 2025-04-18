import { Router } from "express";
import { TrainingController } from "../../presentation/controllers/TrainingController";

const router = Router();
const trainingController = new TrainingController();

// Create a training
router.post("/", trainingController.createTraining);

// Get all trainings
router.get("/", trainingController.getTrainings);

// Get training by ID
router.get("/:id", trainingController.getTrainingById);

// Update training
router.put("/:id", trainingController.updateTraining);

// Delete training
router.delete("/:id", trainingController.deleteTraining);

export default router;
