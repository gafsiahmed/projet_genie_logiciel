import { Training } from "../../../domain/entities/Training";
import { TrainingCategory } from "../../../utils/constants";

// Single Responsibility Principle - validation logic separated from entity
export class TrainingValidator {
  validate(training: Training): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!training.getName() || training.getName().length < 2) {
      errors.push("Name must be at least 2 characters");
    }
    
    if (!training.getDescription() || training.getDescription().length < 10) {
      errors.push("Description must be at least 10 characters");
    }
    
    if (training.getPrice() <= 0) {
      errors.push("Price must be greater than 0");
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
    
    if (!training.getCategory() || !validCategories.includes(training.getCategory())) {
      errors.push("Invalid category");
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}