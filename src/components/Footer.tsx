import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-64 right-0 h-8 bg-surface-container-lowest/95 backdrop-blur-md z-30 shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-4 flex items-center justify-between border-t border-outline-variant/20 text-[10.5px]">
      <div className="flex items-center gap-2">
        <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
        <span className="text-on-surface-variant">
          Inference Engine (XGBoost + Prophet + OR-Tools)
        </span>
        <span className="text-primary font-semibold">
          • Online 14ms
        </span>
      </div>
      <div className="text-on-surface-variant truncate max-w-xl hidden md:block">
        Government of India AgriTech Research Prototype
      </div>
    </footer>
  );
};
