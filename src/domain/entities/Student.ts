import mongoose from "mongoose";
import { BaseEntity } from "./BaseEntity";

export class Student extends BaseEntity {
  // Change from private to protected to ensure they can be accessed in fromModel
  protected firstName: string;
  protected lastName: string;
  protected age: number;
  protected trainingSession: string | mongoose.Types.ObjectId;
  protected payment: number;
  protected email: string;
  protected paymentStatus: "Paid" | "Not Paid" | "Pending";
  protected phoneNumber: number;

  constructor(data: {
    id?: mongoose.Types.ObjectId;
    firstName?: string;
    lastName?: string;
    age?: number;
    trainingSession?: string | mongoose.Types.ObjectId;
    payment?: number;
    email?: string;
    paymentStatus?: "Paid" | "Not Paid" | "Pending";
    phoneNumber?: number;
  }) {
    super(data.id);
    this.firstName = data.firstName || "";
    this.lastName = data.lastName || "";
    this.age = data.age || 0;
    this.trainingSession = data.trainingSession || "";
    this.payment = data.payment || 0;
    this.email = data.email || "";
    this.paymentStatus = data.paymentStatus || "Not Paid";
    this.phoneNumber = data.phoneNumber || 0;
    
    console.log("Student constructor assigned:", {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber
    });
  }

  // Getters
  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPayment(): number {
    return this.payment;
  }

  public getPaymentStatus(): string {
    return this.paymentStatus;
  }

  public getTrainingSession(): string | mongoose.Types.ObjectId {
    return this.trainingSession;
  }

  // Calculate payment status based on payment amount
  public calculatePaymentStatus(): "Paid" | "Not Paid" | "Pending" {
    if (this.payment === 550) {
      return "Paid";
    } else if (this.payment > 10) {
      return "Pending";
    } else {
      return "Not Paid";
    }
  }

  public validate(): boolean {
    // Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!this.email || !emailRegex.test(this.email)) {
      return false;
    }
    
    // Basic validation
    if (!this.firstName || !this.lastName || !this.phoneNumber) {
      return false;
    }
    
    return true;
  }

  // For mapping to database model
  public toModel(): any {
    return {
      _id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
      trainingSession: this.trainingSession,
      payment: this.payment,
      email: this.email,
      paymentStatus: this.paymentStatus,
      phoneNumber: this.phoneNumber
    };
  }

  // Factory method to create from database model
  public static fromModel(model: any): Student {
    console.log("fromModel received:", model);
    
    const student = new Student({
      id: model._id,
      firstName: model.firstName,
      lastName: model.lastName,
      age: model.age,
      trainingSession: model.trainingSession,
      payment: model.payment,
      email: model.email,
      paymentStatus: model.paymentStatus,
      phoneNumber: model.phoneNumber
    });
    
    console.log("fromModel created student:", student);
    return student;
  }
}