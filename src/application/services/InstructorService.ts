import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { Instructor } from "../../domain/entities/Instructor";
import { InstructorRepository } from "../../infrastructure/repositories/InstructorRepository";

import { NotificationStrategy } from "../../domain/notifcationStrategy/INotificationStrategy";

export class InstructorService {
  private repository: InstructorRepository;
  private notifier: NotificationStrategy;

  constructor(repository: InstructorRepository, notifier: NotificationStrategy) {
    this.repository = repository;
    this.notifier = notifier;
  }
  
  async getInstructors(): Promise<Instructor[]> {
    return await this.repository.findAll();
  }
  
  async getInstructorById(id: string | ObjectId): Promise<Instructor | null> {
    return await this.repository.findById(id);
  }
  
  async createInstructor(instructorData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    phoneNumber: number;
    training: string;
  }): Promise<Instructor> {
    const hashedPassword = await bcrypt.hash(instructorData.password, 10);
    const instructor = new Instructor({ ...instructorData, password: hashedPassword });

    if (!instructor.validate()) {
      throw new Error("Invalid instructor data");
    }

    const createdInstructor = await this.repository.create(instructor);

    // Utilise la stratégie actuelle (email ou autre)
    await this.notifier.send(
      instructorData.email,
      "Welcome to OpusBoard",
      `
        <h1>Welcome to OpusBoard</h1>
        <p>Your email: <strong>${instructorData.email}</strong></p>
        <p>Your password: <strong>${instructorData.password}</strong></p>
      `
    );

    return createdInstructor;
  }
  
  async updateInstructor(
    id: string | ObjectId,
    instructorData: any
  ): Promise<Instructor | null> {
    try {
      // Only hash password if it's provided
      if (instructorData.password) {
        // Hash password
        instructorData.password = await bcrypt.hash(instructorData.password, 10);
      } else {
        // If no password provided, remove it from the update data
        delete instructorData.password;
      }
      
      // Ensure role is set to instructor
      instructorData.role = "instructor";
      
      // Update in database
      return await this.repository.update(id, instructorData);
    } catch (error) {
      console.error("Error updating instructor:", error);
      throw error;
    }
  }
  
  async deleteInstructor(id: string | ObjectId): Promise<boolean> {
    return await this.repository.delete(id);
  }
  

}