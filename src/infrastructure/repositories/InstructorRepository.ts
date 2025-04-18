import { ObjectId } from "mongodb";
import { IRepository } from "../../domain/repositories/IRepository";
import { Instructor } from "../../domain/entities/Instructor";
import InstructorModel from "../../models/Instructor";

export class InstructorRepository implements IRepository<Instructor> {
  async findById(id: string | ObjectId): Promise<Instructor | null> {
    const instructorModel = await InstructorModel.findById(id);
    if (!instructorModel) return null;
    
    return Instructor.fromModel(instructorModel);
  }
  
  async findAll(): Promise<Instructor[]> {
    const instructorModels = await InstructorModel.find({ role: "instructor" });
    return instructorModels.map(model => Instructor.fromModel(model));
  }
  
  async create(instructor: Instructor): Promise<Instructor> {
    const instructorModel = new InstructorModel(instructor.toModel());
    const savedModel = await instructorModel.save();
    return Instructor.fromModel(savedModel);
  }
  
  async update(id: string | ObjectId, updateData: any): Promise<Instructor | null> {
    try {
      // Remove _id if present to avoid conflicts
      if (updateData._id) {
        delete updateData._id;
      }
      
      // Ensure role is set
      updateData.role = "instructor";
      
      // Find the existing instructor
      const existingInstructor = await InstructorModel.findById(id);
      if (!existingInstructor) {
        return null;
      }
      
      // Update only the fields that are provided
      const updatedModel = await InstructorModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      
      if (!updatedModel) return null;
      
      return Instructor.fromModel(updatedModel);
    } catch (error) {
      console.error("Error in repository update:", error);
      throw error;
    }
  }
  
  async delete(id: string | ObjectId): Promise<boolean> {
    const result = await InstructorModel.findByIdAndDelete(id);
    return result !== null;
  }
}