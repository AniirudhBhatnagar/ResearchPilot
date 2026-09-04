import React from 'react';
import { Search, BookOpen, PenTool, ShieldCheck, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="text-center pt-8 pb-4 max-w-3xl mx-auto px-4">
      {/* Top micro pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-medium mb-6 shadow-sm">
        <Zap className="w-3.5 h-3.5 text-brand-400" />
        <span>Multi-Agent Research Pipeline</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-surface-50 mb-4">
        Research anything.{' '}
        <span className="bg-gradient-to-r from-brand-300 via-teal-200 to-cyan-400 bg-clip-text text-transparent">
          Get a deep report.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-surface-400 font-normal leading-relaxed max-w-2xl mx-auto mb-8">
        Search the live web, read relevant sources, synthesize findings, and get an AI critique.
      </p>

      {/* 4 Agent Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto text-left">
        <div className="p-3 rounded-xl bg-surface-900/60 border border-surface-800/80 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-surface-200">Search Agent</div>
            <div className="text-[11px] text-surface-500">Tavily Web Search</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-surface-900/60 border border-surface-800/80 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-surface-200">Reader Agent</div>
            <div className="text-[11px] text-surface-500">BS4 Deep Scrape</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-surface-900/60 border border-surface-800/80 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-surface-200">Writer Chain</div>
            <div className="text-[11px] text-surface-500">Synthesis Engine</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-surface-900/60 border border-surface-800/80 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-surface-200">Critic Chain</div>
            <div className="text-[11px] text-surface-500">Quality Reviewer</div>
          </div>
        </div>
      </div>
    </div>
  );
};
