import { CalendarEvent } from "domain/entities/CalendarEvent";
import { Types } from "mongoose";

export interface ICalendarEventRepository {
  findById(id: string | Types.ObjectId): Promise<CalendarEvent | null>;
  update(id: string | Types.ObjectId, data: any): Promise<CalendarEvent | null>;
  delete(id: string | Types.ObjectId): Promise<boolean>;
  findAll(): Promise<CalendarEvent[]>;
  create(event: CalendarEvent): Promise<CalendarEvent>;
}
