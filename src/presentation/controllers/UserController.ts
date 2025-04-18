import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { UserService } from "../../application/services/UserService";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { userValidation, userValidationForUpdate } from "../../validation/user.validation";

export class UserController extends BaseController {
  private userService: UserService;
  
  constructor() {
    super();
    const repository = new UserRepository();
    this.userService = new UserService(repository);
    
    // Bind methods to ensure 'this' context
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  
  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getUsers();
      return this.sendSuccess(res, users);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (!user) {
        return this.sendNotFound(res, "User not found");
      }
      return this.sendSuccess(res, user);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = userValidation.validate(req.body);
      if (error) {
        return this.sendBadRequest(res, error.details[0].message);
      }
      
      const user = await this.userService.createUser(value);
      return this.sendSuccess(res, user, 201);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = userValidationForUpdate.validate(req.body);
      
      // Log the data for debugging
      console.log("Update data:", value);
      
      if (error) {
        return this.sendBadRequest(res, error.details[0].message);
      }
      
      // Make sure we're passing the ID and the update data
      const user = await this.userService.updateUser(req.params.id, value);
      
      if (!user) {
        return this.sendNotFound(res, "User not found");
      }
      
      // Return the updated user
      return this.sendSuccess(res, user);
    } catch (error) {
      console.error("Error in updateUser controller:", error);
      return this.sendError(res, error);
    }
  }
  
  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const success = await this.userService.deleteUser(req.params.id);
      if (!success) {
        return this.sendNotFound(res, "User not found");
      }
      return this.sendSuccess(res, { message: "User deleted successfully" });
    } catch (error) {
      return this.sendError(res, error);
    }
  }
}