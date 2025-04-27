import { ICalendarEventRepository } from "domain/repositories/ICalendarEventRepository";
import { ObjectId } from "mongodb";
import { CalendarEvent } from "../../domain/entities/CalendarEvent";
import CalendarEventsModel from "../../models/CalendarEvents";

export class CalendarEventRepository implements ICalendarEventRepository {
  
  async findAll(): Promise<CalendarEvent[]> {
    const models = await CalendarEventsModel.find();
    return models.map(CalendarEvent.fromModel);
  }

  async findById(id: string | ObjectId): Promise<CalendarEvent | null> {
    const model = await CalendarEventsModel.findById(id);
    return model ? CalendarEvent.fromModel(model) : null;
  }

  async create(event: CalendarEvent): Promise<CalendarEvent> {
    const model = new CalendarEventsModel(event.toModel());
    const saved = await model.save();
    return CalendarEvent.fromModel(saved);
  }

  async update(id: string | ObjectId, data: any): Promise<CalendarEvent | null> {
    const updated = await CalendarEventsModel.findByIdAndUpdate(id, data, { new: true });
    return updated ? CalendarEvent.fromModel(updated) : null;
  }

  async delete(id: string | ObjectId): Promise<boolean> {
    const deleted = await CalendarEventsModel.findByIdAndDelete(id);
    return !!deleted;
  }
}
