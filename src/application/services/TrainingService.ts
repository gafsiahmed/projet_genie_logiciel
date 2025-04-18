import mongoose from "mongoose";
import { Training } from "../../domain/entities/Training";
import { TrainingRepository } from "../../infrastructure/repositories/TrainingRepository";

type ObjectId = mongoose.Types.ObjectId;

export class TrainingService {
  private repository: TrainingRepository;
  
  constructor(repository: TrainingRepository) {
    this.repository = repository;
  }
  
  async getTrainings(page?: number, limit?: number): Promise<Training[] | { items: Training[], totalPages: number, currentPage: number }> {
    return await this.repository.findAll(page, limit);
  }
  
  async getTrainingById(id: string | ObjectId): Promise<Training | null> {
    return await this.repository.findById(id);
  }
  
  async createTraining(trainingData: any): Promise<Training> {
    // Create training entity
    const training = new Training({
      name: trainingData.name,
      description: trainingData.description,
      price: trainingData.price,
      category: trainingData.category
    });
    
    // Validate training
    if (!training.validate()) {
      throw new Error("Invalid training data");
    }
    
    // Save to database
    const createdTraining = await this.repository.create(training);
    
    return createdTraining;
  }
  
  async updateTraining(
    id: string | ObjectId,
    trainingData: any
  ): Promise<Training | null> {
    try {
      // Update in database
      const updatedTraining = await this.repository.update(id, trainingData);
      
      return updatedTraining;
    } catch (error) {
      console.error("Error updating training:", error);
      throw error;
    }
  }
  
  async deleteTraining(id: string | ObjectId): Promise<boolean> {
    return await this.repository.delete(id);
  }
}