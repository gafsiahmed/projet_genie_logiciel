import mongoose from "mongoose";
import { IRepository } from "../../domain/repositories/IRepository";
import { Student } from "../../domain/entities/Student";
import StudentModel from "../../models/Student";

// Use the correct ObjectId type
type ObjectId = mongoose.Types.ObjectId;

export class StudentRepository implements IRepository<Student> {
  async findById(id: string | ObjectId): Promise<Student | null> {
    const studentModel = await StudentModel.findById(id);
    if (!studentModel) return null;
    
    return Student.fromModel(studentModel);
  }
  
  async findAll(page?: number, limit?: number): Promise<Student[] | { items: Student[], totalPages: number, currentPage: number }> {
    if (page !== undefined && limit !== undefined) {
      const studentModels = await StudentModel.find()
        .populate("trainingSession")
        .populate({
          path: "trainingSession",
          populate: {
            path: "training",
          },
        })
        .populate({
          path: "trainingSession",
          populate: {
            path: "instructor",
          },
        })
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
      
      const count = await StudentModel.countDocuments();
      
      return {
        items: studentModels.map(model => Student.fromModel(model)),
        totalPages: Math.ceil(count / limit),
        currentPage: page
      };
    } else {
      const studentModels = await StudentModel.find()
        .populate("trainingSession")
        .populate({
          path: "trainingSession",
          populate: {
            path: "training",
          },
        })
        .populate({
          path: "trainingSession",
          populate: {
            path: "instructor",
          },
        });
      
      return studentModels.map(model => Student.fromModel(model));
    }
  }
  
  async create(student: Student): Promise<Student> {
    // Get the model data
    const studentData = student.toModel();
    
    // Log the data for debugging
    console.log("Creating student with data:", studentData);
    
    const studentModel = new StudentModel(studentData);
    const savedModel = await studentModel.save();
    
    // Log the saved model
    console.log("Saved student model:", savedModel);
    
    return Student.fromModel(savedModel);
  }
  
  async update(id: string | ObjectId, studentData: any): Promise<Student | null> {
    try {
      // Remove _id if present to avoid conflicts
      if (studentData._id) {
        delete studentData._id;
      }
      
      // Find the existing student
      const existingStudent = await StudentModel.findById(id);
      if (!existingStudent) {
        return null;
      }
      
      // Update only the fields that are provided
      const updatedModel = await StudentModel.findByIdAndUpdate(
        id,
        { $set: studentData },
        { new: true, runValidators: true }
      );
      
      if (!updatedModel) return null;
      
      return Student.fromModel(updatedModel);
    } catch (error) {
      console.error("Error in repository update:", error);
      throw error;
    }
  }
  
  async delete(id: string | ObjectId): Promise<boolean> {
    const result = await StudentModel.findByIdAndDelete(id);
    return result !== null;
  }
}