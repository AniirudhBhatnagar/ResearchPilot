import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, FileDown, Clock, FileText, Sparkles } from 'lucide-react';
import { getReadingTime, getWordCount } from '../utils/parser';

interface ReportViewerProps {
  topic: string;
  report: string;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({ topic, report }) => {
  const [copied, setCopied] = useState(false);

  const wordCount = getWordCount(report);
  const readingTime = getReadingTime(report);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([`# Research Report: ${topic}\n\n${report}`], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${topic.toLowerCase().replace(/[^a-z0-9]/g, '_')}_report.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-surface-900/90 rounded-2xl border border-surface-800 shadow-xl overflow-hidden backdrop-blur-xl animate-fade-in">
      {/* Report Header Bar */}
      <div className="px-6 py-4 border-b border-surface-800 flex flex-wrap items-center justify-between gap-4 bg-surface-950/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
            <FileText className="w-4 h-4 text-brand-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-surface-100 flex items-center gap-2">
              Synthesized Research Report
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20">
                AI Synthesis
              </span>
            </h2>
            <div className="flex items-center gap-3 text-xs text-surface-400 mt-0.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-surface-500" />
                {readingTime}
              </span>
              <span>•</span>
              <span>{wordCount} words</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-800 hover:bg-surface-700 text-surface-200 border border-surface-700 hover:border-surface-600 transition-colors active:scale-95"
            title="Copy report as markdown"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-surface-400" />
                <span>Copy Markdown</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-800 hover:bg-surface-700 text-surface-200 border border-surface-700 hover:border-surface-600 transition-colors active:scale-95"
            title="Download report .md file"
          >
            <FileDown className="w-3.5 h-3.5 text-surface-400" />
            <span>Export .md</span>
          </button>
        </div>
      </div>

      {/* Markdown Body */}
      <div className="p-6 sm:p-8 lg:p-10">
        {report ? (
          <article className="markdown-body max-w-none prose prose-invert prose-brand">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-400 hover:text-brand-300 underline font-medium inline-flex items-center gap-1"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {report}
            </ReactMarkdown>
          </article>
        ) : (
          <div className="py-12 text-center text-surface-500">
            <Sparkles className="w-8 h-8 mx-auto mb-2 text-surface-600" />
            <p className="text-sm">No report generated yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
