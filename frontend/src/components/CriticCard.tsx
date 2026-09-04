import React, { useState } from 'react';
import { ShieldCheck, CheckCircle, AlertTriangle, MessageSquareQuote, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { parseCriticFeedback } from '../utils/parser';

interface CriticCardProps {
  feedback: string;
}

export const CriticCard: React.FC<CriticCardProps> = ({ feedback }) => {
  const [showRaw, setShowRaw] = useState(false);
  const parsed = parseCriticFeedback(feedback);

  // Score styling logic
  const scoreNum = parsed.scoreNumber;
  const scoreBadgeColor = 
    scoreNum !== undefined && scoreNum >= 8
      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 ring-emerald-500/20'
      : scoreNum !== undefined && scoreNum >= 6
      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 ring-amber-500/20'
      : 'bg-rose-500/10 text-rose-300 border-rose-500/30 ring-rose-500/20';

  return (
    <div className="bg-surface-900/90 rounded-2xl border border-surface-800 shadow-xl overflow-hidden backdrop-blur-xl animate-fade-in">
      {/* Header Bar */}
      <div className="px-6 py-4 border-b border-surface-800 flex items-center justify-between bg-surface-950/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-surface-100 flex items-center gap-2">
              Critic Evaluation
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Quality Audit
              </span>
            </h3>
            <p className="text-xs text-surface-400">Strict LLM evaluation of report accuracy & depth</p>
          </div>
        </div>

        {/* Score Badge */}
        {parsed.rawScore && (
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm shadow-sm ring-1 ${scoreBadgeColor}`}>
            <Star className="w-4 h-4 fill-current opacity-80" />
            <span>Score: {parsed.rawScore}</span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* One-Line Verdict Banner */}
        {parsed.verdict && (
          <div className="p-4 rounded-xl bg-surface-850/80 border border-surface-750 flex items-start gap-3">
            <MessageSquareQuote className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-brand-300 uppercase tracking-wider mb-1">
                Critic Verdict
              </div>
              <p className="text-sm text-surface-200 italic leading-relaxed">
                "{parsed.verdict}"
              </p>
            </div>
          </div>
        )}

        {/* Grid: Strengths & Areas to Improve */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="p-4 rounded-xl bg-surface-950/40 border border-surface-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
              <CheckCircle className="w-4 h-4" />
              <span>Strengths ({parsed.strengths.length})</span>
            </div>
            {parsed.strengths.length > 0 ? (
              <ul className="space-y-2.5">
                {parsed.strengths.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-surface-300 leading-relaxed">
                    <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-surface-500 italic">No explicit strengths listed.</p>
            )}
          </div>

          {/* Areas to Improve */}
          <div className="p-4 rounded-xl bg-surface-950/40 border border-surface-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
              <AlertTriangle className="w-4 h-4" />
              <span>Areas to Improve ({parsed.areasToImprove.length})</span>
            </div>
            {parsed.areasToImprove.length > 0 ? (
              <ul className="space-y-2.5">
                {parsed.areasToImprove.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-surface-300 leading-relaxed">
                    <span className="text-amber-400 font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-surface-500 italic">No improvement items noted.</p>
            )}
          </div>
        </div>

        {/* Fallback / Raw Output Toggle */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowRaw(!showRaw)}
            className="flex items-center gap-1.5 text-xs text-surface-400 hover:text-surface-200 transition-colors font-mono"
          >
            {showRaw ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>{showRaw ? 'Hide raw feedback text' : 'View raw critic evaluation output'}</span>
          </button>

          {showRaw && (
            <pre className="mt-3 p-4 rounded-xl bg-surface-950 border border-surface-800 text-xs font-mono text-surface-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
              {feedback}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
