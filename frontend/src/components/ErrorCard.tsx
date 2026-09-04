import React from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';

interface ErrorCardProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({ message, onRetry }) => {
  return (
    <div className="w-full max-w-xl mx-auto mt-8 px-4 animate-fade-in">
      <div className="p-6 sm:p-8 rounded-2xl bg-surface-900/90 border border-rose-500/30 shadow-2xl backdrop-blur-xl text-center relative overflow-hidden">
        
        {/* Subtle red glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>

        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
          <AlertOctagon className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-surface-100 mb-2">
          Research Execution Failed
        </h3>

        <p className="text-sm text-surface-400 max-w-md mx-auto mb-6 leading-relaxed">
          {message || 'An unexpected error occurred while executing the research pipeline. Please verify that your API keys are configured correctly and try again.'}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-surface-950 bg-gradient-to-r from-rose-400 to-amber-300 hover:from-rose-300 hover:to-amber-200 shadow-lg shadow-rose-500/20 transition-all active:scale-95 select-none"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
};
