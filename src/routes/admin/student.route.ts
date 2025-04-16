import { Router } from "express";
import { accessByRole } from "../../middleware/auth.middleware";

import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "../../controllers/admin/student.controller";

const router = Router();

router.post("/", accessByRole(["admin"]), createStudent);
router.get("/", accessByRole(["admin"]), getStudents);
router.delete("/:id", accessByRole(["admin"]), deleteStudent);
router.post("/:id", accessByRole(["admin"]), updateStudent);

export default router;
