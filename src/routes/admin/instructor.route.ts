import { Router } from "express";
import { InstructorController } from "../../presentation/controllers/InstructorController";
import { accessByRole } from "../../middleware/auth.middleware";

const router = Router();
const instructorController = new InstructorController();

// Public routes
router.post("/", instructorController.createInstructor);
router.get("/", instructorController.getInstructors);
router.get("/:id", instructorController.getInstructorById);
router.put("/:id", instructorController.updateInstructor);
router.delete("/:id", instructorController.deleteInstructor);

// Protected routes (commented out for now)
// router.post("/", accessByRole(["admin"]), instructorController.createInstructor);
// router.get("/", accessByRole(["admin"]), instructorController.getInstructors);
// router.get("/:id", accessByRole(["admin"]), instructorController.getInstructorById);
// router.put("/:id", accessByRole(["admin"]), instructorController.updateInstructor);
// router.delete("/:id", accessByRole(["admin"]), instructorController.deleteInstructor);

export default router;



















//******************OLD CODE **************************** */


// import { Router } from "express";

// import {
//   createInstructor,
//   deleteInstructor,
//   getInstrucotor,
//   updateInstructor,
// } from "../../controllers/admin/instructor.controller";

// const router = Router();


// router.post("/", accessByRole(["admin"]), createInstructor);
// router.get("/", accessByRole(["admin"]), getInstrucotor);
// router.delete("/:id", accessByRole(["admin"]), deleteInstructor);
// router.post("/:id", accessByRole(["admin"]), updateInstructor);

// export default router;
