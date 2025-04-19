import { ObjectId } from "mongodb";

export class Devis {
  constructor(
    public id: ObjectId | null,
    public code: string,
    public validetDate: Date
  ) {}

  validate(): boolean {
    return !!this.code && !!this.validetDate;
  }

  toModel(): any {
    return {
      _id: this.id,
      code: this.code,
      validetDate: this.validetDate,
    };
  }

  static fromModel(model: any): Devis {
    return new Devis(model._id, model.code, model.validetDate);
  }
}
