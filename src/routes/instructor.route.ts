import { Router } from "express";

import {
  createInstructor,
  deleteInstructor,
  getInstrucotor,
  updateInstructor,
} from "../controllers/admin/instructor.controller";

const router = Router();

router.post("/", createInstructor);
router.get("/", getInstrucotor);
router.delete("/:id", deleteInstructor);
router.post("/:id", updateInstructor);
// router.post("/", accessByRole(["admin"]), createInstructor);
// router.get("/", accessByRole(["admin"]), getInstrucotor);
// router.delete("/:id", accessByRole(["admin"]), deleteInstructor);
// router.post("/:id", accessByRole(["admin"]), updateInstructor);

export default router;
