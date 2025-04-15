import express from "express";
import {
  createEvent,
  deleteEventById,
  getAllEvents,
  getEventById,
  updateEventById,
} from "../controllers/admin/calendar.controller";

const router = express.Router();

// gett all events
router.get("/", getAllEvents);
//get event by id
router.get("/:id", getEventById);
//create new event
router.post("/", createEvent);
//update exisiting event
router.post("/:id", updateEventById);
//delete a event by his id
router.delete("/:id", deleteEventById);

export default router;
