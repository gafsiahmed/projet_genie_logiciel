import { Router } from "express";

import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  updateEmployee,
} from "../../controllers/admin/employee.controller";

const router = Router();

router.post("/", createEmployee);
router.get("/", getEmployee);
router.post("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
