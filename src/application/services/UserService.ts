import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
// import { eventEmitter } from "../../domain/events/EventEmitter";

export class UserService {
  private repository: UserRepository;
  
  constructor(repository: UserRepository) {
    this.repository = repository;
  }
  
  async getUsers(): Promise<User[]> {
    return await this.repository.findAll();
  }
  
  async getUserById(id: string | ObjectId): Promise<User | null> {
    return await this.repository.findById(id);
  }
  
  async createUser(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    phoneNumber: number;
  }): Promise<User> {
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Create user entity
    const user = new User({
      ...userData,
      password: hashedPassword
    });
    
    // Validate user
    if (!user.validate()) {
      throw new Error("Invalid user data");
    }
    
    // Save to database
    const createdUser = await this.repository.create(user);
    
    // Emit event
    // eventEmitter.emit('user:created', createdUser);
    
    return createdUser;
  }
  
  async updateUser(
    id: string | ObjectId,
    userData: any
  ): Promise<User | null> {
    try {
      console.log("Service received update data:", userData);
      
      // Only hash password if it's provided
      if (userData.password) {
        // Hash password
        userData.password = await bcrypt.hash(userData.password, 10);
      } else {
        // If no password provided, remove it from the update data
        delete userData.password;
      }
      
      // Update in database
      const updatedUser = await this.repository.update(id, userData);
      
      console.log("Updated user:", updatedUser);
      
      if (updatedUser) {
        // Emit event
        // eventEmitter.emit('user:updated', updatedUser);
      }
      
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
  
  async deleteUser(id: string | ObjectId): Promise<boolean> {
    const success = await this.repository.delete(id);
    
    if (success) {
      // Emit event
    //   eventEmitter.emit('user:deleted', id);
    }
    
    return success;
  }
}