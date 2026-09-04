import React, { useState } from 'react';
import { Search, ExternalLink, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { ParsedSourceItem } from '../types';

interface SearchResultsProps {
  items: ParsedSourceItem[];
  rawSearchResults: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ items, rawSearchResults }) => {
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id || null);
  const [showRaw, setShowRaw] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-surface-900/90 rounded-2xl border border-surface-800 shadow-xl overflow-hidden backdrop-blur-xl animate-fade-in">
      <div className="px-6 py-4 border-b border-surface-800 flex items-center justify-between bg-surface-950/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            <Search className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-surface-100 flex items-center gap-2">
              Live Search Discoveries
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                Tavily Live Index
              </span>
            </h3>
            <p className="text-xs text-surface-400">Search results gathered by the primary Search Agent</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-3">
        {items.length > 0 ? (
          items.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="rounded-xl border border-surface-800 bg-surface-950/40 overflow-hidden transition-all duration-200 hover:border-surface-700"
              >
                <div
                  onClick={() => toggleExpand(item.id)}
                  className="p-4 cursor-pointer flex items-center justify-between gap-4 select-none"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                      <span className="text-xs font-mono text-brand-400 truncate">{item.domain}</span>
                    </div>
                    <h4 className="text-sm font-medium text-surface-200 truncate">
                      {item.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg text-surface-400 hover:text-brand-300 hover:bg-surface-800 transition-colors"
                      title="Open URL"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      className="p-1.5 rounded-lg text-surface-400 hover:text-surface-200 transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {isExpanded && item.snippet && (
                  <div className="px-4 pb-4 pt-1 text-xs text-surface-400 border-t border-surface-800/60 leading-relaxed bg-surface-900/30">
                    <div className="font-semibold text-[11px] text-surface-500 uppercase tracking-wider mb-1">
                      Snippet
                    </div>
                    <p className="italic text-surface-300">"{item.snippet}"</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-xs text-surface-500 italic py-4 text-center">No structured search items found.</p>
        )}

        {/* Fallback / Raw Output Toggle */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowRaw(!showRaw)}
            className="flex items-center gap-1.5 text-xs text-surface-400 hover:text-surface-200 transition-colors font-mono"
          >
            {showRaw ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>{showRaw ? 'Hide raw search agent output' : 'View raw search results dump'}</span>
          </button>

          {showRaw && (
            <pre className="mt-3 p-4 rounded-xl bg-surface-950 border border-surface-800 text-xs font-mono text-surface-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
              {rawSearchResults}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
