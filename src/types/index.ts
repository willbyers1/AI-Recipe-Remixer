export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  tips?: string;
}

export interface UserPreferences {
  dietaryRestrictions: string;
  cuisine: string;
  maxTime: string;
}
