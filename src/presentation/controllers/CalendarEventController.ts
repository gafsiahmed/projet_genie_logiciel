import { Request, Response } from "express";
import { CalendarEventService } from "../../application/services/CalendarEventService";
import { CalendarEventRepository } from "../../infrastructure/repositories/CalendarEventRepository";
import { BaseController } from "./BaseController";

export class CalendarEventController extends BaseController {
  private calendarEventService: CalendarEventService;

  constructor() {
    super();
    const repository = new CalendarEventRepository();
    this.calendarEventService = new CalendarEventService(repository);

    // Bind all methods
    this.getAllEvents = this.getAllEvents.bind(this);
    this.getEventById = this.getEventById.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  async getAllEvents(req: Request, res: Response): Promise<Response> {
    try {
      const events = await this.calendarEventService.getAllEvents();
      return this.sendSuccess(res, events);
    } catch (error) {
      return this.sendError(res, error);
    }
  }

  async getEventById(req: Request, res: Response): Promise<Response> {
    try {
      const event = await this.calendarEventService.getEventById(req.params.id);
      if (!event) {
        return this.sendNotFound(res, "Event not found");
      }
      return this.sendSuccess(res, event);
    } catch (error) {
      return this.sendError(res, error);
    }
  }

  async createEvent(req: Request, res: Response): Promise<Response> {
    try {
      const { title, date } = req.body;
      if (!title || !date) {
        return this.sendBadRequest(res, "Title and Date are required.");
      }

      const event = await this.calendarEventService.createEvent({ title, date });
      return this.sendSuccess(res, event, 201);
    } catch (error) {
      return this.sendError(res, error);
    }
  }

  async updateEvent(req: Request, res: Response): Promise<Response> {
    try {
      const event = await this.calendarEventService.updateEvent(req.params.id, req.body);
      if (!event) {
        return this.sendNotFound(res, "Event not found");
      }
      return this.sendSuccess(res, event);
    } catch (error) {
      return this.sendError(res, error);
    }
  }

  async deleteEvent(req: Request, res: Response): Promise<Response> {
    try {
      const success = await this.calendarEventService.deleteEvent(req.params.id);
      if (!success) {
        return this.sendNotFound(res, "Event not found");
      }
      return this.sendSuccess(res, { message: "Event deleted successfully" });
    } catch (error) {
      return this.sendError(res, error);
    }
  }
}
