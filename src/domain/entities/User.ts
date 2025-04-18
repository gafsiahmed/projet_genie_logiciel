import { ObjectId } from "mongodb";
import { BaseEntity } from "./BaseEntity";

export class User extends BaseEntity {
  protected firstName: string;
  protected lastName: string;
  protected email: string;
  protected password: string;
  protected phoneNumber: number;
  protected role: string;
  
  constructor(data: {
    id?: ObjectId;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phoneNumber?: number;
    role?: string;
  }) {
    super(data.id);
    this.firstName = data.firstName || "";
    this.lastName = data.lastName || "";
    this.email = data.email || "";
    this.password = data.password || "";
    this.phoneNumber = data.phoneNumber || 0;
    this.role = data.role || "user";
  }
  
  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  
  public getEmail(): string {
    return this.email;
  }
  
  public getRole(): string {
    return this.role;
  }
  
  public validate(): boolean {
    // Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!this.email || !emailRegex.test(this.email)) {
      return false;
    }
    
    // Password validation (minimum 6 characters)
    if (!this.password || this.password.length < 6) {
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
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
      role: this.role
    };
  }
  
  // Factory method to create from database model
  public static fromModel(model: any): User {
    return new User({
      id: model._id,
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
      phoneNumber: model.phoneNumber,
      password: model.password,
      role: model.role
    });
  }
}