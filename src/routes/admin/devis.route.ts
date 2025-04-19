import { Router } from "express";
import { DevisController } from "../../presentation/controllers/DevisController";

const router = Router();
const controller = new DevisController();

router.post("/", controller.createDevis);
router.get("/", controller.getDevis);
router.post("/:id", controller.updateDevis);
router.delete("/:id", controller.deleteDevis);

export default router;
