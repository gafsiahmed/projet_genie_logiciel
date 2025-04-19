import { ObjectId } from "mongodb";

export class CalendarEvent {
  constructor(
    public id: ObjectId | null,
    public title: string,
    public date: Date
  ) {}

  validate(): boolean {
    return !!this.title && !!this.date;
  }

  toModel(): any {
    return {
      _id: this.id,
      title: this.title,
      date: this.date,
    };
  }

  static fromModel(model: any): CalendarEvent {
    return new CalendarEvent(model._id, model.title, model.date);
  }
}
