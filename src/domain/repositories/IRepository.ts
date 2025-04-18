import mongoose from "mongoose";
import { BaseEntity } from "../entities/BaseEntity";

export interface IRepository<T extends BaseEntity> {
  findById(id: string | mongoose.Types.ObjectId): Promise<T | null>;
  findAll(page?: number, limit?: number): Promise<T[] | { items: T[], totalPages: number, currentPage: number }>;
  create(entity: T): Promise<T>;
  update(id: string | mongoose.Types.ObjectId, data: any): Promise<T | null>;
  delete(id: string | mongoose.Types.ObjectId): Promise<boolean>;
}