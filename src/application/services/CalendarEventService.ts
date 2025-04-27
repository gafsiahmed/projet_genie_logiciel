import { ICalendarEventRepository } from "domain/repositories/ICalendarEventRepository";
import { ObjectId } from "mongodb";
import { CalendarEvent } from "../../domain/entities/CalendarEvent";

export class CalendarEventService {
  private repository: ICalendarEventRepository;

  constructor(repository: ICalendarEventRepository) {
    this.repository = repository;
  }

  async getAllEvents(): Promise<CalendarEvent[]> {
    return await this.repository.findAll();
  }

  async getEventById(id: string | ObjectId): Promise<CalendarEvent | null> {
    return await this.repository.findById(id);
  }

  async createEvent(data: { title: string; date: Date }): Promise<CalendarEvent> {
    const event = new CalendarEvent(null, data.title, new Date(data.date));

    if (!event.validate()) {
      throw new Error("Invalid event data");
    }

    return await this.repository.create(event);
  }

  async updateEvent(id: string | ObjectId, data: any): Promise<CalendarEvent | null> {
    return await this.repository.update(id, data);
  }

  async deleteEvent(id: string | ObjectId): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
