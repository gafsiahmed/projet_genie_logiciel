import mongoose from "mongoose";
import { TrainingCategory } from "../../utils/constants";
import { BaseEntity } from "./BaseEntity";

export class Training extends BaseEntity {
  protected name: string;
  protected description: string;
  protected price: number;
  protected category: string;

  constructor(data: {
    id?: mongoose.Types.ObjectId;
    name?: string;
    description?: string;
    price?: number;
    category?: string;
  }) {
    super(data.id);
    this.name = data.name || "";
    this.description = data.description || "";
    this.price = data.price || 0;
    this.category = data.category || "";
  }

  // Getters
  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getPrice(): number {
    return this.price;
  }

  public getCategory(): string {
    return this.category;
  }

  // Validation
  public validate(): boolean {
    if (!this.name || this.name.length < 2) {
      return false;
    }
    
    if (!this.description || this.description.length < 10) {
      return false;
    }
    
    if (this.price <= 0) {
      return false;
    }
    
    // Validate category is one of the allowed values
    const validCategories = [
      TrainingCategory.webdev[1],
      TrainingCategory.webdev[2],
      TrainingCategory.webdev[3],
      TrainingCategory.design,
      TrainingCategory.marketing,
      TrainingCategory.python,
      TrainingCategory.ux_ui,
      TrainingCategory.junior,
      TrainingCategory.data
    ];
    
    if (!this.category || !validCategories.includes(this.category)) {
      return false;
    }
    
    return true;
  }

  // For mapping to database model
  public toModel(): any {
    return {
      _id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category
    };
  }

  // Factory method to create from database model
  public static fromModel(model: any): Training {
    return new Training({
      id: model._id,
      name: model.name,
      description: model.description,
      price: model.price,
      category: model.category
    });
  }
}