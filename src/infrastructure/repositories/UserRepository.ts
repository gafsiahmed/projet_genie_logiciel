import { ObjectId } from "mongodb";
import { IRepository } from "../../domain/repositories/IRepository";
import { User } from "../../domain/entities/User";
import UserModel from "../../models/User";

export class UserRepository implements IRepository<User> {
  async findById(id: string | ObjectId): Promise<User | null> {
    const userModel = await UserModel.findById(id);
    if (!userModel) return null;
    
    return User.fromModel(userModel);
  }
  
  async findAll(): Promise<User[]> {
    const userModels = await UserModel.find();
    return userModels.map(model => User.fromModel(model));
  }
  
  async create(user: User): Promise<User> {
    const userModel = new UserModel(user.toModel());
    const savedModel = await userModel.save();
    return User.fromModel(savedModel);
  }
  
  async update(id: string | ObjectId, userData: any): Promise<User | null> {
    try {
      console.log("Repository received update data:", userData);
      
      // Remove _id if present to avoid conflicts
      if (userData._id) {
        delete userData._id;
      }
      
      // Find the existing user
      const existingUser = await UserModel.findById(id);
      if (!existingUser) {
        return null;
      }
      
      console.log("Existing user before update:", existingUser);
      
      // Update only the fields that are provided
      const updatedModel = await UserModel.findByIdAndUpdate(
        id,
        { $set: userData },
        { new: true, runValidators: true }
      );
      
      console.log("Updated model from database:", updatedModel);
      
      if (!updatedModel) return null;
      
      return User.fromModel(updatedModel);
    } catch (error) {
      console.error("Error in repository update:", error);
      throw error;
    }
  }
  
  async delete(id: string | ObjectId): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return result !== null;
  }
}