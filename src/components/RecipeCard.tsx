import React, { useState } from 'react';
import { Clock, Users, ChefHat, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#1a1a24]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-white/20">
      <div className="p-6 md:p-8">
        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{recipe.title}</h3>
        <p className="text-white/60 mb-6 leading-relaxed">{recipe.description}</p>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/5">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-white/80">{recipe.prepTime} + {recipe.cookTime}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/5">
            <Users className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-white/80">{recipe.servings} Servings</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/5">
            <ChefHat className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-white/80">{recipe.difficulty}</span>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors border border-transparent hover:border-white/10"
        >
          <span className="font-semibold text-white">View Full Recipe</span>
          {expanded ? <ChevronUp className="text-white/60" /> : <ChevronDown className="text-white/60" />}
        </button>

        {expanded && (
          <div className="mt-6 space-y-8 animate-in slide-in-from-top-4 fade-in duration-300">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">1</span>
                Ingredients
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm leading-relaxed">{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">2</span>
                Instructions
              </h4>
              <ol className="space-y-4">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 text-sm font-medium border border-white/10">
                      {idx + 1}
                    </div>
                    <p className="text-white/80 leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {recipe.tips && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5">
                <h4 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
                  <ChefHat className="w-5 h-5" /> Chef's Tip
                </h4>
                <p className="text-amber-200/80 text-sm leading-relaxed">{recipe.tips}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
