import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { TrainingService } from "../../application/services/TrainingService";
import { TrainingRepository } from "../../infrastructure/repositories/TrainingRepository";
import { TrainingValidator } from "../../application/services/validation/TrainingValidator";

export class TrainingController extends BaseController {
  private trainingService: TrainingService;
  private trainingValidator: TrainingValidator;
  
  constructor() {
    super();
    const repository = new TrainingRepository();
    this.trainingService = new TrainingService(repository);
    this.trainingValidator = new TrainingValidator();
    
    // Bind methods to ensure 'this' context
    this.createTraining = this.createTraining.bind(this);
    this.getTrainings = this.getTrainings.bind(this);
    this.getTrainingById = this.getTrainingById.bind(this);
    this.updateTraining = this.updateTraining.bind(this);
    this.deleteTraining = this.deleteTraining.bind(this);
  }
  
  async createTraining(req: Request, res: Response): Promise<Response> {
    try {
      // Use TrainingValidator instead of Joi validation
      const validationResult = this.trainingValidator.validate(req.body);
      if (!validationResult.isValid) {
        return this.sendBadRequest(res, validationResult.errors.join(", "));
      }
      
      const training = await this.trainingService.createTraining(req.body);
      return this.sendSuccess(res, training, 201);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async updateTraining(req: Request, res: Response): Promise<Response> {
    try {
      // Use TrainingValidator for update validation as well
      const validationResult = this.trainingValidator.validate(req.body);
      if (!validationResult.isValid) {
        return this.sendBadRequest(res, validationResult.errors.join(", "));
      }
      
      const training = await this.trainingService.updateTraining(req.params.id, req.body);
      if (!training) {
        return this.sendNotFound(res, "Training not found");
      }
      return this.sendSuccess(res, training);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async getTrainings(req: Request, res: Response): Promise<Response> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const trainings = await this.trainingService.getTrainings(page, limit);
      return this.sendSuccess(res, trainings);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async getTrainingById(req: Request, res: Response): Promise<Response> {
    try {
      const training = await this.trainingService.getTrainingById(req.params.id);
      if (!training) {
        return this.sendNotFound(res, "Training not found");
      }
      return this.sendSuccess(res, training);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async deleteTraining(req: Request, res: Response): Promise<Response> {
    try {
      const success = await this.trainingService.deleteTraining(req.params.id);
      if (!success) {
        return this.sendNotFound(res, "Training not found");
      }
      return this.sendSuccess(res, { message: "Training deleted successfully" });
    } catch (error) {
      return this.sendError(res, error);
    }
  }
}