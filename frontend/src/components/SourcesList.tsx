import React from 'react';
import { Globe, ExternalLink, Link2 } from 'lucide-react';
import { ParsedSourceItem } from '../types';

interface SourcesListProps {
  sources: ParsedSourceItem[];
}

export const SourcesList: React.FC<SourcesListProps> = ({ sources }) => {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface-900/90 rounded-2xl border border-surface-800 shadow-xl overflow-hidden backdrop-blur-xl animate-fade-in">
      <div className="px-6 py-4 border-b border-surface-800 flex items-center justify-between bg-surface-950/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            <Link2 className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-surface-100 flex items-center gap-2">
              Referenced Sources
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                {sources.length} Cited
              </span>
            </h3>
            <p className="text-xs text-surface-400">Validated URLs inspected by the research agents</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sources.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3.5 rounded-xl bg-surface-950/50 border border-surface-800 hover:border-brand-500/40 hover:bg-surface-850 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-brand-400 mb-1.5">
                  <Globe className="w-3 h-3 text-surface-500 group-hover:text-brand-400 transition-colors" />
                  <span className="truncate">{item.domain}</span>
                </div>
                <h4 className="text-xs font-semibold text-surface-200 group-hover:text-white line-clamp-2 leading-snug">
                  {item.title}
                </h4>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-surface-500 group-hover:text-brand-300 pt-2 border-t border-surface-800/60">
                <span>Open source link</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
