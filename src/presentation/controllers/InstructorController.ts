import { Request, Response } from "express";
import { InstructorService } from "../../application/services/InstructorService";
import { InstructorRepository } from "../../infrastructure/repositories/InstructorRepository";
import { userValidation, userValidationForUpdate } from "../../validation/user.validation";
import { BaseController } from "./BaseController";

export class InstructorController extends BaseController {
  private instructorService: InstructorService;
  
  constructor() {
    super();
    const repository = new InstructorRepository();
    this.instructorService = new InstructorService(repository);
    
    // Bind methods to ensure 'this' context
    this.createInstructor = this.createInstructor.bind(this);
    this.getInstructors = this.getInstructors.bind(this);
    this.getInstructorById = this.getInstructorById.bind(this);
    this.updateInstructor = this.updateInstructor.bind(this);
    this.deleteInstructor = this.deleteInstructor.bind(this);
  }
  
  async createInstructor(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = userValidation.validate(req.body);
      if (error) {
        return this.sendBadRequest(res, error.details[0].message);
      }
      
      const instructor = await this.instructorService.createInstructor(value);
      return this.sendSuccess(res, instructor, 201);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async getInstructors(req: Request, res: Response): Promise<Response> {
    try {
      const instructors = await this.instructorService.getInstructors();
      return this.sendSuccess(res, instructors);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async getInstructorById(req: Request, res: Response): Promise<Response> {
    try {
      const instructor = await this.instructorService.getInstructorById(req.params.id);
      if (!instructor) {
        return this.sendNotFound(res, "Instructor not found");
      }
      return this.sendSuccess(res, instructor);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async updateInstructor(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = userValidationForUpdate.validate(req.body);

      console.log("Error:", error);
      console.log("Value:", value);
      if (error) {
        return this.sendBadRequest(res, error.details[0].message);
      }
      
      const instructor = await this.instructorService.updateInstructor(req.params.id, value);
      if (!instructor) {
        return this.sendNotFound(res, "Instructor not found");
      }
      return this.sendSuccess(res, instructor);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async deleteInstructor(req: Request, res: Response): Promise<Response> {
    try {
      const success = await this.instructorService.deleteInstructor(req.params.id);
      if (!success) {
        return this.sendNotFound(res, "Instructor not found");
      }
      return this.sendSuccess(res, { message: "Instructor deleted successfully" });
    } catch (error) {
      return this.sendError(res, error);
    }
  }
}