import { Router } from "express";
import { StudentController } from "../../presentation/controllers/StudentController";
import { accessByRole } from "../../middleware/auth.middleware";

const router = Router();
const studentController = new StudentController();

// Create a student
router.post("/", studentController.createStudent);

// Get all students
router.get("/", accessByRole(["admin"]), studentController.getStudents);

// Get student by ID
router.get("/:id", studentController.getStudentById);

// Update student (changed from POST to PUT)
router.put("/:id", studentController.updateStudent);

// Delete student
router.delete("/:id", studentController.deleteStudent);

export default router;
