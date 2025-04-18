import mongoose from "mongoose";
import { TrainingSession } from "../../domain/entities/TrainingSession";
import { TrainingSessionRepository } from "../../infrastructure/repositories/TrainingSessionRepository";

type ObjectId = mongoose.Types.ObjectId;

export class TrainingSessionService {
  private repository: TrainingSessionRepository;
  
  constructor(repository: TrainingSessionRepository) {
    this.repository = repository;
  }
  
  async getTrainingSessions(page?: number, limit?: number): Promise<TrainingSession[] | { items: TrainingSession[], totalPages: number, currentPage: number }> {
    return await this.repository.findAll(page, limit);
  }
  
  async getTrainingSessionById(id: string | ObjectId): Promise<TrainingSession | null> {
    return await this.repository.findById(id);
  }
  
  async getTrainingSessionsByInstructorEmail(email: string): Promise<TrainingSession[]> {
    return await this.repository.findByInstructorEmail(email);
  }
  
  async createTrainingSession(sessionData: any): Promise<TrainingSession> {
    // Create session entity
    const session = new TrainingSession({
      startDate: sessionData.startDate,
      endDate: sessionData.endDate,
      instructor: sessionData.instructor,
      students: sessionData.students || [],
      training: sessionData.training
    });
    
    // Validate session
    if (!session.validate()) {
      throw new Error("Invalid training session data");
    }
    
    // Save to database
    const createdSession = await this.repository.create(session);
    
    return createdSession;
  }
  
  async updateTrainingSession(
    id: string | ObjectId,
    sessionData: any
  ): Promise<TrainingSession | null> {
    try {
      // Update in database
      const updatedSession = await this.repository.update(id, sessionData);
      
      return updatedSession;
    } catch (error) {
      console.error("Error updating training session:", error);
      throw error;
    }
  }
  
  async deleteTrainingSession(id: string | ObjectId): Promise<boolean> {
    return await this.repository.delete(id);
  }
}