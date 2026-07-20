import React, { useState } from 'react';
import LightRays from './components/LightRays';
import SpecularButton from './components/SpecularButton';
import { IngredientInput } from './components/IngredientInput';
import { SettingsModal } from './components/SettingsModal';
import { RecipeCard } from './components/RecipeCard';
import { LoadingState } from './components/LoadingState';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateRecipes } from './lib/gemini';
import { Recipe, UserPreferences } from './types';
import { Settings, Sparkles, ChefHat } from 'lucide-react';

export default function App() {
  const [apiKey, setApiKey] = useLocalStorage<string>('gemini_api_key', '');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('recipe_preferences', {
    dietaryRestrictions: '',
    cuisine: '',
    maxTime: ''
  });
  
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleRemix = async () => {
    if (!apiKey) {
      setIsSettingsOpen(true);
      return;
    }
    
    if (ingredients.length === 0) {
      setError("Please add at least one ingredient.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const generated = await generateRecipes(apiKey, ingredients, preferences);
      setRecipes(generated);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while generating recipes.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setIngredients([]);
    setRecipes([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#03010A] text-white selection:bg-indigo-500/30 font-sans">
      {/* Hero Section with LightRays Background */}
      <div className="relative w-full min-h-[600px] md:min-h-[800px] flex flex-col items-center justify-center overflow-hidden py-24">
        <div className="absolute inset-0 z-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#4F46E5"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
          />
          {/* Gradient Overlay to fade into the content below */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#03010A]/50 to-[#03010A] pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center mt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-100">AI-Powered Recipe Generation</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/40">
            AI Recipe Remixer
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            Turn your leftover ingredients into culinary masterpieces. Enter what you have in your fridge, and our AI chef will create something extraordinary.
          </p>

          <div className="bg-[#12121a]/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl mx-auto text-left max-w-3xl relative">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/20 blur-[50px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <label className="block text-lg font-semibold text-white mb-4">
                What's in your fridge?
              </label>
              <IngredientInput ingredients={ingredients} onChange={setIngredients} />
              
              <div className="mt-6 flex flex-wrap gap-2 mb-8">
                <span className="text-sm text-white/40 mr-2 self-center">Quick add:</span>
                {['Chicken', 'Rice', 'Broccoli', 'Eggs', 'Milk', 'Cheese', 'Garlic', 'Onion'].map(item => (
                  <button
                    key={item}
                    onClick={() => {
                      if (!ingredients.includes(item)) setIngredients([...ingredients, item]);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 transition-colors border border-white/5"
                  >
                    + {item}
                  </button>
                ))}
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-t border-white/10 pt-6">
                <button
                  onClick={handleClear}
                  className="text-sm text-white/50 hover:text-white transition-colors px-4 py-2"
                >
                  Clear All
                </button>
                <SpecularButton
                  onClick={handleRemix}
                  disabled={isLoading}
                  size="lg"
                  autoAnimate={true}
                  className="w-full md:w-auto min-w-[240px]"
                >
                  {isLoading ? 'Remixing...' : 'Remix My Ingredients'}
                </SpecularButton>
              </div>
            </div>
          </div>
        </div>

        {/* Top right settings button */}
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="absolute top-6 right-6 z-20 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 text-white/80" />
        </button>
      </div>

      {/* Main Content Area */}
      <main className="relative z-20 max-w-5xl mx-auto px-6 py-12 md:py-24">
        {error && (
          <div className="mb-12 bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-red-200 text-center max-w-3xl mx-auto backdrop-blur-md">
            <p className="font-medium">{error}</p>
            {!apiKey && (
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="mt-4 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-colors font-medium"
              >
                Configure API Key
              </button>
            )}
          </div>
        )}

        {isLoading && <LoadingState />}

        {!isLoading && recipes.length > 0 && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Custom Recipes</h2>
              <p className="text-white/60">We crafted these unique dishes based on your ingredients.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              {recipes.map((recipe, idx) => (
                <RecipeCard key={recipe.id || idx} recipe={recipe} />
              ))}
            </div>
            
            <div className="flex justify-center pt-8 border-t border-white/10">
              <SpecularButton onClick={handleRemix} size="md">
                Regenerate Recipes
              </SpecularButton>
            </div>
          </div>
        )}

        {!isLoading && recipes.length === 0 && !error && (
          <div className="text-center py-20 opacity-50">
            <ChefHat className="w-16 h-16 mx-auto mb-6 text-white/20" />
            <h3 className="text-xl font-medium text-white mb-2">Ready to cook?</h3>
            <p className="text-white/60 max-w-md mx-auto">Add your ingredients above and let our AI chef create something delicious.</p>
          </div>
        )}
      </main>

      {isSettingsOpen && (
        <SettingsModal
          apiKey={apiKey}
          preferences={preferences}
          onSave={(newApiKey, newPreferences) => {
            setApiKey(newApiKey);
            setPreferences(newPreferences);
          }}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
}
