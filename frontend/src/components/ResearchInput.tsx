import React, { useState } from 'react';
import { Search, ArrowRight, Loader2, X, Sparkles } from 'lucide-react';

interface ResearchInputProps {
  onSearch: (topic: string) => void;
  isLoading: boolean;
  initialTopic?: string;
}

const EXAMPLE_TOPICS = [
  'AI Agents',
  'RAG Architecture',
  'Model Context Protocol (MCP)',
  'LLM Evaluation Benchmarks',
  'AI Coding Agents',
  'DeepSeek v3 Architecture',
];

export const ResearchInput: React.FC<ResearchInputProps> = ({
  onSearch,
  isLoading,
  initialTopic = '',
}) => {
  const [topic, setTopic] = useState(initialTopic);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = topic.trim();
    if (trimmed && !isLoading) {
      onSearch(trimmed);
    }
  };

  const handleSelectExample = (example: string) => {
    setTopic(example);
    if (!isLoading) {
      onSearch(example);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mt-8">
      {/* Search Bar Container */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500/40 via-cyan-500/30 to-brand-400/40 rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition duration-500 group-focus-within:opacity-100"></div>

        <div className="relative flex items-center bg-surface-900/90 backdrop-blur-xl border border-surface-700/80 rounded-2xl p-2 shadow-2xl focus-within:border-brand-500/70 transition-all duration-200">
          <div className="pl-3 pr-2 text-surface-400">
            <Search className="w-5 h-5 group-focus-within:text-brand-400 transition-colors" />
          </div>

          <input
            id="research-topic-input"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={isLoading}
            placeholder="Enter a research topic, e.g. 'latest AI agent frameworks'..."
            className="w-full bg-transparent text-surface-100 placeholder-surface-500 text-sm sm:text-base px-2 py-3 focus:outline-none disabled:opacity-50"
            autoFocus
          />

          {topic && !isLoading && (
            <button
              type="button"
              onClick={() => setTopic('')}
              className="p-1.5 text-surface-500 hover:text-surface-300 rounded-lg hover:bg-surface-800 transition-colors mr-2"
              title="Clear topic"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            disabled={!topic.trim() || isLoading}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-surface-950 bg-gradient-to-r from-brand-400 to-brand-300 hover:from-brand-300 hover:to-brand-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 active:scale-[0.98] transition-all duration-200 whitespace-nowrap select-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-surface-950" />
                <span>Researching...</span>
              </>
            ) : (
              <>
                <span>Start Research</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Suggested Chips */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-surface-400 flex items-center gap-1 font-medium mr-1">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          Try exploring:
        </span>
        {EXAMPLE_TOPICS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => handleSelectExample(item)}
            disabled={isLoading}
            className="px-3 py-1 rounded-lg bg-surface-900/80 hover:bg-surface-800 text-surface-300 hover:text-brand-300 border border-surface-800/80 hover:border-brand-500/30 transition-all duration-150 disabled:opacity-40 disabled:pointer-events-none"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};
