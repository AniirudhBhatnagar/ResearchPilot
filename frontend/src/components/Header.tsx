import React from 'react';
import { Sparkles, Bot, Radio, Github } from 'lucide-react';

interface HeaderProps {
  apiStatus: 'checking' | 'online' | 'offline';
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ apiStatus, onReset }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-800/80 bg-surface-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 p-[1px] shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/30 transition-all duration-300">
            <div className="w-full h-full bg-surface-950 rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brand-400 group-hover:scale-110 transition-transform duration-200" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-surface-100 via-surface-200 to-brand-300 bg-clip-text text-transparent">
                ResearchOS
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20">
                <Bot className="w-3 h-3 text-brand-400" />
                LangChain Multi-Agent
              </span>
            </div>
            <p className="text-[11px] text-surface-400 hidden sm:block">Autonomous Web Research & Critique Engine</p>
          </div>
        </div>

        {/* Right Nav Badges & Status */}
        <div className="flex items-center gap-3">
          {/* API Health Status Indicator */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-900 border border-surface-800 text-xs text-surface-300">
            <Radio 
              className={`w-3.5 h-3.5 ${
                apiStatus === 'online' 
                  ? 'text-emerald-400 animate-pulse' 
                  : apiStatus === 'checking'
                  ? 'text-amber-400 animate-spin'
                  : 'text-rose-400'
              }`} 
            />
            <span className="text-[11px] font-medium capitalize">
              {apiStatus === 'online' ? 'Backend Ready' : apiStatus === 'checking' ? 'Connecting...' : 'Offline'}
            </span>
          </div>

          {/* GitHub / LangChain link badge */}
          <span className="text-xs text-surface-400 font-medium px-2.5 py-1 rounded-full bg-surface-900/60 border border-surface-800 hidden md:inline-flex items-center gap-1.5">
            <Github className="w-3.5 h-3.5 text-surface-400" />
            <span>v1.0.0</span>
          </span>
        </div>
      </div>
    </header>
  );
};
