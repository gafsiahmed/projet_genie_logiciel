import mongoose from "mongoose";
import { IRepository } from "../../domain/repositories/IRepository";
import { TrainingSession } from "../../domain/entities/TrainingSession";
import TrainingSessionModel from "../../models/TrainingSession";
import InstructorModel from "../../models/Instructor";

type ObjectId = mongoose.Types.ObjectId;

export class TrainingSessionRepository implements IRepository<TrainingSession> {
  async findById(id: string | ObjectId): Promise<TrainingSession | null> {
    const sessionModel = await TrainingSessionModel.findById(id)
      .populate("students")
      .populate("instructor")
      .populate("training");
      
    if (!sessionModel) return null;
    
    return TrainingSession.fromModel(sessionModel);
  }
  
  async findAll(page?: number, limit?: number): Promise<TrainingSession[] | { items: TrainingSession[], totalPages: number, currentPage: number }> {
    if (page !== undefined && limit !== undefined) {
      const sessionModels = await TrainingSessionModel.find()
        .populate("instructor")
        .populate("training")
        .populate("students") // This is causing the issue
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
      
      const count = await TrainingSessionModel.countDocuments();
      
      return {
        items: sessionModels.map(model => TrainingSession.fromModel(model)),
        totalPages: Math.ceil(count / limit),
        currentPage: page
      };
    } else {
      const sessionModels = await TrainingSessionModel.find()
        .populate("instructor")
        .populate("training")
        .populate("students"); // This is causing the issue
      
      return sessionModels.map(model => TrainingSession.fromModel(model));
    }
  }
  
  async findByInstructorEmail(email: string): Promise<TrainingSession[]> {
    const instructor = await InstructorModel.findOne({ email });
    if (!instructor) return [];
    
    const sessionModels = await TrainingSessionModel.find({ instructor: instructor._id })
      .populate("students")
      .populate("instructor")
      .populate("training");
    
    return sessionModels.map(model => TrainingSession.fromModel(model));
  }
  
  async create(session: TrainingSession): Promise<TrainingSession> {
    const sessionModel = new TrainingSessionModel(session.toModel());
    const savedModel = await sessionModel.save();
    return TrainingSession.fromModel(savedModel);
  }
  
  async update(id: string | ObjectId, sessionData: any): Promise<TrainingSession | null> {
    try {
      // Remove _id if present to avoid conflicts
      if (sessionData._id) {
        delete sessionData._id;
      }
      
      // Find the existing session
      const existingSession = await TrainingSessionModel.findById(id);
      if (!existingSession) {
        return null;
      }
      
      // Update only the fields that are provided
      const updatedModel = await TrainingSessionModel.findByIdAndUpdate(
        id,
        { $set: sessionData },
        { new: true, runValidators: true }
      )
      .populate("students")
      .populate("instructor")
      .populate("training");
      
      if (!updatedModel) return null;
      
      return TrainingSession.fromModel(updatedModel);
    } catch (error) {
      console.error("Error in repository update:", error);
      throw error;
    }
  }
  
  async delete(id: string | ObjectId): Promise<boolean> {
    const result = await TrainingSessionModel.findByIdAndDelete(id);
    return result !== null;
  }
}