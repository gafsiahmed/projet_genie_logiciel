import CalendarEvents, { ICalendarEvents } from "../../models/CalendarEvents";

import { Request, Response } from "express";

// create an event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = req.body as ICalendarEvents;
    const newEvent = new CalendarEvents(event);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all events
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await CalendarEvents.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get event by id
export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await CalendarEvents.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update event by id
export const updateEventById = async (req: Request, res: Response) => {
  try {
    const event = await CalendarEvents.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete event by id
export const deleteEventById = async (req: Request, res: Response) => {
  try {
    await CalendarEvents.findByIdAndDelete(req.params.id);
    res.status(200).json("Event has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};
