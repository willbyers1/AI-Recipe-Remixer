import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

export const generateRecipes = async (
  apiKey: string,
  ingredients: string[],
  preferences?: { dietaryRestrictions?: string; cuisine?: string; maxTime?: string }
): Promise<Recipe[]> => {
  if (!apiKey) {
    throw new Error("Gemini API key is required");
  }

  const ai = new GoogleGenAI({ apiKey });

  let prompt = `I have the following ingredients: ${ingredients.join(", ")}. `;
  
  if (preferences) {
    if (preferences.dietaryRestrictions) {
      prompt += `Dietary restrictions: ${preferences.dietaryRestrictions}. `;
    }
    if (preferences.cuisine) {
      prompt += `Preferred cuisine: ${preferences.cuisine}. `;
    }
    if (preferences.maxTime) {
      prompt += `Max total time (prep + cook): ${preferences.maxTime}. `;
    }
  }

  prompt += `Please generate exactly 3 distinct and creative recipes using these ingredients. You can include basic pantry staples (like salt, pepper, oil, etc.). Ensure the recipes are varied in style and flavor profile.`;

  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING, description: "A unique identifier for the recipe" },
        title: { type: Type.STRING, description: "The name of the recipe" },
        description: { type: Type.STRING, description: "A short, appetizing description" },
        prepTime: { type: Type.STRING, description: "Preparation time, e.g., '15 mins'" },
        cookTime: { type: Type.STRING, description: "Cooking time, e.g., '30 mins'" },
        servings: { type: Type.STRING, description: "Number of servings, e.g., '2-4'" },
        difficulty: { type: Type.STRING, description: "Difficulty level, e.g., 'Easy', 'Medium', 'Hard'" },
        ingredients: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "List of ingredients with quantities"
        },
        instructions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Step-by-step cooking instructions"
        },
        tips: { type: Type.STRING, description: "Optional nutritional highlights or a creative twist" }
      },
      required: ["id", "title", "description", "prepTime", "cookTime", "servings", "difficulty", "ingredients", "instructions"]
    },
    description: "An array of exactly 3 recipes."
  };

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema,
      temperature: 0.7,
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate recipes. No response text.");
  }

  try {
    const data = JSON.parse(response.text) as Recipe[];
    return data;
  } catch (error) {
    console.error("Error parsing Gemini API response", error);
    throw new Error("Failed to parse recipe data.");
  }
};
