import React, { useState } from 'react';
import { BookOpen, Copy, Check, ChevronDown, ChevronUp, Terminal } from 'lucide-react';
import { getWordCount } from '../utils/parser';

interface ScrapedContentProps {
  content: string;
}

export const ScrapedContent: React.FC<ScrapedContentProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const wordCount = getWordCount(content);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="bg-surface-900/90 rounded-2xl border border-surface-800 shadow-xl overflow-hidden backdrop-blur-xl animate-fade-in">
      {/* Header Bar / Accordion trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-4 cursor-pointer flex items-center justify-between bg-surface-950/40 hover:bg-surface-950/60 transition-colors select-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-surface-100 flex items-center gap-2">
              Source Notes / Scraped Content
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Reader Agent
              </span>
            </h3>
            <p className="text-xs text-surface-400">
              Clean textual content parsed by BeautifulSoup ({wordCount} words)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isOpen && content && (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-surface-800 hover:bg-surface-700 text-surface-200 border border-surface-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-surface-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}

          <div className="p-1 text-surface-400 hover:text-surface-200">
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className="p-6 border-t border-surface-800/80 bg-surface-950/60">
          <div className="flex items-center justify-between mb-3 text-xs text-surface-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Raw Extracted Buffer
            </span>
            <span>Character length: {content.length.toLocaleString()}</span>
          </div>

          <div className="max-h-96 overflow-y-auto p-4 rounded-xl bg-surface-950 border border-surface-800 text-xs font-mono text-surface-300 whitespace-pre-wrap leading-relaxed">
            {content || 'No scraped content available.'}
          </div>
        </div>
      )}
    </div>
  );
};
