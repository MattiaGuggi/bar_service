import React from "react";
import { Wine } from "lucide-react";

const Loader = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-[#0c0a09] text-stone-100 relative overflow-hidden">
      {/* Warm Ambient Radial Light */}
      <div className="absolute w-80 h-80 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center p-4 rounded-2xl bg-stone-900/80 border border-amber-500/20 shadow-xl">
          <Wine className="w-8 h-8 text-amber-400 animate-bounce" />
        </div>
        <p className="text-xs font-medium tracking-widest uppercase text-amber-500/80 animate-pulse">
          Crafting menu...
        </p>
      </div>
    </div>
  );
};

export default Loader;