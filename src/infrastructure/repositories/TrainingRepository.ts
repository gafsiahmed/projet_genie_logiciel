import mongoose from "mongoose";
import { IRepository } from "../../domain/repositories/IRepository";
import { Training } from "../../domain/entities/Training";
import TrainingModel from "../../models/Training";

type ObjectId = mongoose.Types.ObjectId;

export class TrainingRepository implements IRepository<Training> {
  async findById(id: string | ObjectId): Promise<Training | null> {
    const trainingModel = await TrainingModel.findById(id);
    if (!trainingModel) return null;
    
    return Training.fromModel(trainingModel);
  }
  
  async findAll(page?: number, limit?: number): Promise<Training[] | { items: Training[], totalPages: number, currentPage: number }> {
    if (page !== undefined && limit !== undefined) {
      const trainingModels = await TrainingModel.find()
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
      
      const count = await TrainingModel.countDocuments();
      
      return {
        items: trainingModels.map(model => Training.fromModel(model)),
        totalPages: Math.ceil(count / limit),
        currentPage: page
      };
    } else {
      const trainingModels = await TrainingModel.find();
      
      return trainingModels.map(model => Training.fromModel(model));
    }
  }
  
  async create(training: Training): Promise<Training> {
    const trainingModel = new TrainingModel(training.toModel());
    const savedModel = await trainingModel.save();
    return Training.fromModel(savedModel);
  }
  
  async update(id: string | ObjectId, trainingData: any): Promise<Training | null> {
    try {
      // Remove _id if present to avoid conflicts
      if (trainingData._id) {
        delete trainingData._id;
      }
      
      // Find the existing training
      const existingTraining = await TrainingModel.findById(id);
      if (!existingTraining) {
        return null;
      }
      
      // Update only the fields that are provided
      const updatedModel = await TrainingModel.findByIdAndUpdate(
        id,
        { $set: trainingData },
        { new: true, runValidators: true }
      );
      
      if (!updatedModel) return null;
      
      return Training.fromModel(updatedModel);
    } catch (error) {
      console.error("Error in repository update:", error);
      throw error;
    }
  }
  
  async delete(id: string | ObjectId): Promise<boolean> {
    const result = await TrainingModel.findByIdAndDelete(id);
    return result !== null;
  }
}