import express from "express";
import { CalendarEventController } from "../../presentation/controllers/CalendarEventController";

const router = express.Router();
const controller = new CalendarEventController();

router.get("/", controller.getAllEvents);
router.get("/:id", controller.getEventById);
router.post("/", controller.createEvent);
router.post("/:id", controller.updateEvent);
router.delete("/:id", controller.deleteEvent);

export default router;
