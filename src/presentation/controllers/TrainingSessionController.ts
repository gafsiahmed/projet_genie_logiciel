import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { TrainingSessionService } from "../../application/services/TrainingSessionService";
import { TrainingSessionRepository } from "../../infrastructure/repositories/TrainingSessionRepository";
import { trainingSessionValidation } from "../../validation/trainingSessions.validation";

export class TrainingSessionController extends BaseController {
  private trainingSessionService: TrainingSessionService;
  
  constructor() {
    super();
    const repository = new TrainingSessionRepository();
    this.trainingSessionService = new TrainingSessionService(repository);
    
    // Bind methods to ensure 'this' context
    this.createTrainingSession = this.createTrainingSession.bind(this);
    this.getTrainingSessions = this.getTrainingSessions.bind(this);
    this.getTrainingSessionById = this.getTrainingSessionById.bind(this);
    this.getTrainingSessionsByInstructorId = this.getTrainingSessionsByInstructorId.bind(this);
    this.updateTrainingSession = this.updateTrainingSession.bind(this);
    this.deleteTrainingSession = this.deleteTrainingSession.bind(this);
  }
  
  async createTrainingSession(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = trainingSessionValidation.validate(req.body);
      if (error) {
        return this.sendBadRequest(res, error.details[0].message);
      }
      
      const session = await this.trainingSessionService.createTrainingSession(value);
      return this.sendSuccess(res, session, 201);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async getTrainingSessions(req: Request, res: Response): Promise<Response> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const sessions = await this.trainingSessionService.getTrainingSessions(page, limit);
      return this.sendSuccess(res, sessions);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async getTrainingSessionById(req: Request, res: Response): Promise<Response> {
    try {
      const session = await this.trainingSessionService.getTrainingSessionById(req.params.id);
      if (!session) {
        return this.sendNotFound(res, "Training session not found");
      }
      return this.sendSuccess(res, session);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async getTrainingSessionsByInstructorId(req: Request, res: Response): Promise<Response> {
    try {
      const email = req.body.email;
      if (!email) {
        return this.sendBadRequest(res, "Instructor email is required");
      }
      
      const sessions = await this.trainingSessionService.getTrainingSessionsByInstructorEmail(email);
      if (sessions.length === 0) {
        return this.sendNotFound(res, "No training sessions found for this instructor");
      }
      
      return this.sendSuccess(res, sessions);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async updateTrainingSession(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = trainingSessionValidation.validate(req.body);
      if (error) {
        return this.sendBadRequest(res, error.details[0].message);
      }
      
      const session = await this.trainingSessionService.updateTrainingSession(req.params.id, value);
      if (!session) {
        return this.sendNotFound(res, "Training session not found");
      }
      return this.sendSuccess(res, session);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async deleteTrainingSession(req: Request, res: Response): Promise<Response> {
    try {
      const success = await this.trainingSessionService.deleteTrainingSession(req.params.id);
      if (!success) {
        return this.sendNotFound(res, "Training session not found");
      }
      return this.sendSuccess(res, { message: "Training session deleted successfully" });
    } catch (error) {
      return this.sendError(res, error);
    }
  }
}