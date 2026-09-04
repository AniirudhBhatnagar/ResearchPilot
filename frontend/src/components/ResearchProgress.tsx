import React, { useEffect, useState } from 'react';
import { Search, BookOpen, PenTool, ShieldCheck, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

interface ResearchProgressProps {
  topic: string;
}

interface StepItem {
  id: string;
  title: string;
  agent: string;
  desc: string;
  icon: React.ElementType;
  approxDurationMs: number;
}

const STEPS: StepItem[] = [
  {
    id: 'search',
    title: 'Searching the web',
    agent: 'Search Agent (Tavily)',
    desc: 'Querying live web engines, ranking snippets & identifying high-signal sources',
    icon: Search,
    approxDurationMs: 4000,
  },
  {
    id: 'scrape',
    title: 'Reading relevant sources',
    agent: 'Reader Agent (BS4 Scraper)',
    desc: 'Extracting clean text content, stripping noise, and compiling raw findings',
    icon: BookOpen,
    approxDurationMs: 6000,
  },
  {
    id: 'write',
    title: 'Writing comprehensive report',
    agent: 'Writer Chain (Groq LLM)',
    desc: 'Synthesizing gathered research into structured sections & key insights',
    icon: PenTool,
    approxDurationMs: 8000,
  },
  {
    id: 'critic',
    title: 'Critiquing & evaluating quality',
    agent: 'Critic Chain (Quality Reviewer)',
    desc: 'Scoring analytical rigor, auditing strengths, and noting improvement areas',
    icon: ShieldCheck,
    approxDurationMs: 5000,
  },
];

export const ResearchProgress: React.FC<ResearchProgressProps> = ({ topic }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Timer for elapsed seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Progressive step advance simulation while waiting for synchronous backend
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (currentStepIdx < STEPS.length - 1) {
      const stepDuration = STEPS[currentStepIdx].approxDurationMs;
      timeout = setTimeout(() => {
        setCurrentStepIdx((prev) => Math.min(prev + 1, STEPS.length - 1));
      }, stepDuration);
    }
    return () => clearTimeout(timeout);
  }, [currentStepIdx]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-10 animate-fade-in">
      <div className="p-6 sm:p-8 rounded-2xl bg-surface-900/90 border border-surface-800 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-800 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-surface-100">
                Multi-Agent Pipeline Executing
              </h3>
              <p className="text-xs text-surface-400 truncate max-w-xs sm:max-w-md">
                Topic: <span className="text-surface-200 font-medium font-mono">"{topic}"</span>
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-300 bg-brand-950/60 border border-brand-800/40 px-2.5 py-1 rounded-md">
              <Loader2 className="w-3 h-3 animate-spin text-brand-400" />
              {elapsedSeconds}s elapsed
            </span>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-4">
          {STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIdx;
            const isActive = idx === currentStepIdx;
            const StepIcon = step.icon;

            return (
              <div
                key={step.id}
                className={`flex items-start gap-4 p-3.5 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? 'bg-surface-850 border-brand-500/40 shadow-lg shadow-brand-500/5'
                    : isCompleted
                    ? 'bg-surface-900/40 border-surface-800/60 opacity-85'
                    : 'bg-transparent border-transparent opacity-40'
                }`}
              >
                {/* Step Status Icon */}
                <div className="mt-0.5 flex-shrink-0">
                  {isCompleted ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                  ) : isActive ? (
                    <div className="w-6 h-6 rounded-full bg-brand-500/20 border border-brand-400/50 flex items-center justify-center">
                      <Loader2 className="w-3.5 h-3.5 text-brand-300 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-surface-800 border border-surface-700 flex items-center justify-center">
                      <span className="text-[11px] font-mono text-surface-400">{idx + 1}</span>
                    </div>
                  )}
                </div>

                {/* Step Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${isActive ? 'text-brand-300' : isCompleted ? 'text-surface-200' : 'text-surface-400'}`}>
                      {step.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-surface-800 text-surface-400 font-mono">
                      {step.agent}
                    </span>
                  </div>
                  <p className="text-xs text-surface-400 mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Trailing Icon */}
                <div className="hidden sm:block text-surface-500">
                  <StepIcon className={`w-4 h-4 ${isActive ? 'text-brand-400 animate-pulse' : 'text-surface-600'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Note */}
        <div className="mt-6 pt-4 border-t border-surface-800/80 flex items-center justify-between text-[11px] text-surface-400">
          <span>Live LangChain Agents coordinating tools & LLM chains</span>
          <span className="text-brand-400 font-medium">Deep research in progress...</span>
        </div>
      </div>
    </div>
  );
};
