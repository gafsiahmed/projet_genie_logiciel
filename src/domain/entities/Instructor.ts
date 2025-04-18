import { ObjectId } from "mongodb";
import { User } from "./UserEntity";

// Remove the abstract keyword from the class declaration
export class Instructor extends User {
  private training : string;
  
  constructor(
    data: {
      id?: ObjectId,
      firstName?: string,
      lastName?: string,
      password?: string,
      email?: string,
      phoneNumber?: number,
      training?: string
    }
  ) {
    super(data);
    this.training = data.training || "";
    // Make sure to explicitly set the role here
    this.role = "instructor";
  }

  public getTraining(): string {
    return this.training; 
  }

  public validate(): boolean {
    // Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!this.email || !emailRegex.test(this.email)) {
      return false;
    }
    
    // Password validation (minimum 9 characters)
    if (!this.password || this.password.length < 9) {
      return false;
    }
    
    // Training validation - ensure instructor has a training field
    if (!this.training) {
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
      role: this.role,
      training: this.training
    };
  }

  // Factory method to create from database model
  public static fromModel(model: any): Instructor {
    return new Instructor({
      id: model._id,
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
      phoneNumber: model.phoneNumber,
      password: model.password,
      training: model.training
    });
  }
}