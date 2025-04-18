import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { StudentService } from "../../application/services/StudentService";
import { StudentRepository } from "../../infrastructure/repositories/StudentRepository";
import { studentValidation } from "../../validation/student.validation";

export class StudentController extends BaseController {
  private studentService: StudentService;
  
  constructor() {
    super();
    const repository = new StudentRepository();
    this.studentService = new StudentService(repository);
    
    // Bind methods to ensure 'this' context
    this.createStudent = this.createStudent.bind(this);
    this.getStudents = this.getStudents.bind(this);
    this.getStudentById = this.getStudentById.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
  }
  
  async createStudent(req: Request, res: Response): Promise<Response> {
    try {
      console.log("StudentController received request body:", req.body);
      
      const { error, value } = studentValidation.validate(req.body);
      if (error) {
        return this.sendBadRequest(res, error.details[0].message);
      }
      
      console.log("Validated data:", value);
      
      const student = await this.studentService.createStudent(value);
      
      console.log("Created student:", student);
      
      return this.sendSuccess(res, student, 201);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async getStudents(req: Request, res: Response): Promise<Response> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const students = await this.studentService.getStudents(page, limit);
      return this.sendSuccess(res, students);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async getStudentById(req: Request, res: Response): Promise<Response> {
    try {
      const student = await this.studentService.getStudentById(req.params.id);
      if (!student) {
        return this.sendNotFound(res, "Student not found");
      }
      return this.sendSuccess(res, student);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async updateStudent(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = studentValidation.validate(req.body);
      if (error) {
        return this.sendBadRequest(res, error.details[0].message);
      }
      
      const student = await this.studentService.updateStudent(req.params.id, value);
      if (!student) {
        return this.sendNotFound(res, "Student not found");
      }
      return this.sendSuccess(res, student);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async deleteStudent(req: Request, res: Response): Promise<Response> {
    try {
      const success = await this.studentService.deleteStudent(req.params.id);
      if (!success) {
        return this.sendNotFound(res, "Student not found");
      }
      return this.sendSuccess(res, { message: "Student deleted successfully" });
    } catch (error) {
      return this.sendError(res, error);
    }
  }
}