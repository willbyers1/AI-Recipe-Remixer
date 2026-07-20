import React, { useState } from 'react';
import { Settings, Key, Info, Utensils, Clock, ShieldCheck } from 'lucide-react';
import SpecularButton from './SpecularButton';
import { UserPreferences } from '../types';

interface SettingsModalProps {
  apiKey: string;
  preferences: UserPreferences;
  onSave: (apiKey: string, preferences: UserPreferences) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ apiKey, preferences, onSave, onClose }) => {
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [localPreferences, setLocalPreferences] = useState<UserPreferences>(preferences);

  const handleSave = () => {
    onSave(localApiKey, localPreferences);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#12121a] border border-white/10 rounded-3xl p-6 w-full max-w-lg shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 blur-[60px] rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="p-2 bg-white/5 rounded-xl border border-white/10">
            <Settings className="w-5 h-5 text-indigo-400" />
          </div>
          <h2 className="text-xl font-semibold text-white tracking-tight">Settings & Preferences</h2>
        </div>

        <div className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2 flex items-center gap-2">
              <Key className="w-4 h-4" /> Gemini API Key
            </label>
            <input
              type="password"
              value={localApiKey}
              onChange={(e) => setLocalApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono text-sm"
            />
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3 text-blue-200 text-sm leading-relaxed mb-4">
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400" />
            <p>
              Your API key is securely stored in your browser's local storage and is never sent to any server other than Google's Gemini API.
            </p>
          </div>

          <hr className="border-white/10" />

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Dietary Restrictions
            </label>
            <input
              type="text"
              value={localPreferences.dietaryRestrictions}
              onChange={(e) => setLocalPreferences({ ...localPreferences, dietaryRestrictions: e.target.value })}
              placeholder="e.g. Vegetarian, Gluten-Free, Nut Allergy..."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2 flex items-center gap-2">
                <Utensils className="w-4 h-4" /> Preferred Cuisine
              </label>
              <input
                type="text"
                value={localPreferences.cuisine}
                onChange={(e) => setLocalPreferences({ ...localPreferences, cuisine: e.target.value })}
                placeholder="e.g. Italian, Mexican..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Max Total Time
              </label>
              <select
                value={localPreferences.maxTime}
                onChange={(e) => setLocalPreferences({ ...localPreferences, maxTime: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm appearance-none"
              >
                <option value="">Any Time</option>
                <option value="15 mins">15 mins or less</option>
                <option value="30 mins">30 mins or less</option>
                <option value="45 mins">45 mins or less</option>
                <option value="1 hour">1 hour or less</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3 relative z-10">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors font-medium text-sm"
          >
            Cancel
          </button>
          <SpecularButton size="sm" onClick={handleSave} autoAnimate={true}>
            Save Changes
          </SpecularButton>
        </div>
      </div>
    </div>
  );
};
