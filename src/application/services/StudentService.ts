import mongoose from "mongoose";
import { Student } from "../../domain/entities/Student";
import { StudentRepository } from "../../infrastructure/repositories/StudentRepository";
// import { eventEmitter } from "../../domain/events/EventEmitter";
// import IncomesModel from "../../models/Incomes";
import TransactionModel from '../../models/Transaction';

// Use the correct ObjectId type
type ObjectId = mongoose.Types.ObjectId;

export class StudentService {
  private repository: StudentRepository;
  
  constructor(repository: StudentRepository) {
    this.repository = repository;
  }
  
  async getStudents(page?: number, limit?: number): Promise<Student[] | { items: Student[], totalPages: number, currentPage: number }> {
    return await this.repository.findAll(page, limit);
  }
  
  async getStudentById(id: string | ObjectId): Promise<Student | null> {
    return await this.repository.findById(id);
  }
  
  async createStudent(studentData: any): Promise<Student> {
    console.log("StudentService received data:", studentData);
    
    // Calculate payment status
    const paymentStatus = studentData.payment === 500
      ? "Paid"
      : studentData.payment > 10
        ? "Pending"
        : "Not Paid";
    
    // Create student entity with all the data
    const student = new Student({
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      age: studentData.age,
      trainingSession: studentData.trainingSession,
      payment: studentData.payment,
      email: studentData.email,
      paymentStatus: paymentStatus,
      phoneNumber: studentData.phoneNumber
    });
    
    // Validate student
    if (!student.validate()) {
      throw new Error("Invalid student data");
    }
    
    // Save to database
    const createdStudent = await this.repository.create(student);
    
    // Create income record
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    
    // Use toModel() to get the id safely
    const studentModel = createdStudent.toModel();
    
    const transaction = {
      date: date,
      student: studentModel._id, // Use _id from the model instead of accessing id directly
      amount: studentData.payment,
      description: "paiement de la formation",
      from: `${studentData.firstName} ${studentData.lastName}`,
      category: "TrainingPayment",
      paymentType: "cash",
      __t: "Income",
    };
    
    const newIncome = new TransactionModel(transaction);
    await newIncome.save();
    
    return createdStudent;
  }
  
  async updateStudent(
    id: string | ObjectId,
    studentData: any
  ): Promise<Student | null> {
    try {
      // Calculate payment status
      const paymentStatus = studentData.payment === 500
        ? "Paid"
        : studentData.payment > 10
          ? "Pending"
          : "Not Paid";
      
      // Update payment status
      const updatedData = {
        ...studentData,
        paymentStatus
      };
      
      // Update income record if payment changed
      if (studentData.payment !== undefined) {
        await TransactionModel.findOneAndUpdate(
          { student: id },
          { amount: studentData.payment }
        );
      }
      
      // Update in database
      const updatedStudent = await this.repository.update(id, updatedData);
      
      if (updatedStudent) {
        // Emit event
       // eventEmitter.emit('student:updated', updatedStudent);
      }
      
      return updatedStudent;
    } catch (error) {
      console.error("Error updating student:", error);
      throw error;
    }
  }
  
  async deleteStudent(id: string | ObjectId): Promise<boolean> {
    const success = await this.repository.delete(id);
    
    if (success) {
      // Emit event
      //eventEmitter.emit('student:deleted', id);
    }
    
    return success;
  }
}