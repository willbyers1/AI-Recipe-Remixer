import { useState } from 'react';
import { ChefHat } from 'lucide-react';

export const RecipeSkeleton = () => {
  return (
    <div className="bg-[#1a1a24]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 animate-pulse">
      <div className="h-8 bg-white/10 rounded-lg w-3/4 mb-4"></div>
      <div className="h-4 bg-white/10 rounded-lg w-full mb-2"></div>
      <div className="h-4 bg-white/10 rounded-lg w-5/6 mb-8"></div>
      
      <div className="flex gap-4 mb-6">
        <div className="h-10 w-28 bg-white/10 rounded-full"></div>
        <div className="h-10 w-28 bg-white/10 rounded-full"></div>
        <div className="h-10 w-28 bg-white/10 rounded-full"></div>
      </div>
      
      <div className="h-14 w-full bg-white/10 rounded-2xl"></div>
    </div>
  );
};

export const LoadingState = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-50 animate-pulse rounded-full"></div>
          <div className="relative bg-[#12121a] p-4 rounded-full border border-white/20">
            <ChefHat className="w-10 h-10 text-white animate-bounce" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Remixing your ingredients...</h3>
        <p className="text-white/60">Our AI chef is brainstorming creative recipes.</p>
      </div>
      <div className="space-y-6">
        <RecipeSkeleton />
        <RecipeSkeleton />
        <RecipeSkeleton />
      </div>
    </div>
  );
};
