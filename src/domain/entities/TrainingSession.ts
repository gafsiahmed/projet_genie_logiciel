import mongoose from "mongoose";
import { BaseEntity } from "./BaseEntity";

export class TrainingSession extends BaseEntity {
  protected startDate: Date;
  protected endDate: Date;
  protected instructor: mongoose.Types.ObjectId | string;
  protected students: (mongoose.Types.ObjectId | string)[];
  protected training: mongoose.Types.ObjectId | string;

  constructor(data: {
    id?: mongoose.Types.ObjectId;
    startDate?: Date;
    endDate?: Date;
    instructor?: mongoose.Types.ObjectId | string;
    students?: (mongoose.Types.ObjectId | string)[];
    training?: mongoose.Types.ObjectId | string;
  }) {
    super(data.id);
    this.startDate = data.startDate || new Date();
    this.endDate = data.endDate || new Date();
    this.instructor = data.instructor || "";
    this.students = data.students || [];
    this.training = data.training || "";
  }

  // Getters
  public getStartDate(): Date {
    return this.startDate;
  }

  public getEndDate(): Date {
    return this.endDate;
  }

  public getInstructor(): mongoose.Types.ObjectId | string {
    return this.instructor;
  }

  public getStudents(): (mongoose.Types.ObjectId | string)[] {
    return this.students;
  }

  public getTraining(): mongoose.Types.ObjectId | string {
    return this.training;
  }

  // Validation
  public validate(): boolean {
    if (!this.startDate || !this.endDate) {
      return false;
    }
    
    if (!this.instructor) {
      return false;
    }
    
    if (!this.training) {
      return false;
    }
    
    return true;
  }

  // For mapping to database model
  public toModel(): any {
    return {
      _id: this.id,
      startDate: this.startDate,
      endDate: this.endDate,
      instructor: this.instructor,
      students: this.students,
      training: this.training
    };
  }

  // Factory method to create from database model
  public static fromModel(model: any): TrainingSession {
    return new TrainingSession({
      id: model._id,
      startDate: model.startDate,
      endDate: model.endDate,
      instructor: model.instructor,
      students: model.students,
      training: model.training
    });
  }
}