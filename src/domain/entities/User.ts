import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

export class User {
  private id: ObjectId;
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;
  private role: string;
  private phoneNumber: number;

  constructor(data: {
    id?: ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    phoneNumber: number;
  }) {
    this.id = data.id || new ObjectId();
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.phoneNumber = data.phoneNumber;
  }

  // Getters
  getId(): ObjectId { return this.id; }
  getFirstName(): string { return this.firstName; }
  getLastName(): string { return this.lastName; }
  getEmail(): string { return this.email; }
  getPassword(): string { return this.password; }
  getRole(): string { return this.role; }
  getPhoneNumber(): number { return this.phoneNumber; }

  // Validation
  validate(): boolean {
    return (
      this.firstName.length >= 2 &&
      this.lastName.length >= 2 &&
      this.email.includes('@') &&
      this.password.length >= 6 &&
      ['admin', 'user', 'instructor'].includes(this.role) &&
      this.phoneNumber.toString().length >= 8
    );
  }

  // Convert to database model
  toModel(): any {
    return {
      _id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      role: this.role,
      phoneNumber: this.phoneNumber
    };
  }
}