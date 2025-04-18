import sgMail from "@sendgrid/mail";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { Instructor } from "../../domain/entities/Instructor";
import { InstructorRepository } from "../../infrastructure/repositories/InstructorRepository";

export class InstructorService {
  private repository: InstructorRepository;
  
  constructor(repository: InstructorRepository) {
    this.repository = repository;
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
    // Hash password
    const hashedPassword = await bcrypt.hash(instructorData.password, 10);
    
    // Create instructor entity
    const instructor = new Instructor({
      ...instructorData,
      password: hashedPassword
    });
    
    // Validate instructor
    if (!instructor.validate()) {
      throw new Error("Invalid instructor data");
    }
    
    // Save to database
    const createdInstructor = await this.repository.create(instructor);
    console.log(createdInstructor);
    
    // Send welcome email
    await this.sendWelcomeEmail(
      instructorData.email,
      instructorData.firstName,
      instructorData.password
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
  
  private async sendWelcomeEmail(
    email: string,
    firstName: string,
    password: string
  ): Promise<void> {
    const msg = {
      to: email,
      from: "selimbarka6@gmail.com",
      subject: "Welcome to OpusBoard",
      text: "Welcome to OpusBoard Instructor",
      html: `
        <style>
          h1 { color: #0d6efd; }
          p { color: #0d6efd; }
        </style>
        <h1>Welcome to OpusBoard</h1>
        <br/>
        <p>your email is <strong>${email}</strong></p>
        <p>your password is <strong>${password}</strong></p>
        <br/>
        <p>If there is any problem please contact the admin on: tkdsayed@gmail.com</p>
        <p>Thank you for using OpusBoard</p>
      `
    };
    
    await sgMail.send(msg);
  }
}