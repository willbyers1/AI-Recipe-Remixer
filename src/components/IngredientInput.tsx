import React, { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';

interface IngredientInputProps {
  ingredients: string[];
  onChange: (ingredients: string[]) => void;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addIngredient();
    }
  };

  const addIngredient = () => {
    const trimmed = inputValue.trim().replace(/^,+|,+$/g, '');
    if (trimmed && !ingredients.includes(trimmed)) {
      onChange([...ingredients, trimmed]);
      setInputValue('');
    }
  };

  const removeIngredient = (ingredientToRemove: string) => {
    onChange(ingredients.filter(ing => ing !== ingredientToRemove));
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-3 min-h-[40px]">
        {ingredients.map((ing, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-sm font-medium text-white shadow-sm backdrop-blur-md transition-all hover:bg-white/20"
          >
            <span>{ing}</span>
            <button
              onClick={() => removeIngredient(ing)}
              className="p-0.5 rounded-full hover:bg-white/30 transition-colors"
              aria-label={`Remove ${ing}`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. 2 eggs, 500g chicken breast..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent backdrop-blur-md transition-all shadow-inner"
        />
        <button
          onClick={addIngredient}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!inputValue.trim()}
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};
