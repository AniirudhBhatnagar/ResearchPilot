import React, { useState } from 'react';
import { FileText, ShieldCheck, Link2, BookOpen, Layers, RotateCcw } from 'lucide-react';
import { ResearchResponse } from '../types';
import { parseSearchResults } from '../utils/parser';
import { ReportViewer } from './ReportViewer';
import { CriticCard } from './CriticCard';
import { SourcesList } from './SourcesList';
import { SearchResults } from './SearchResults';
import { ScrapedContent } from './ScrapedContent';

interface ResultsDashboardProps {
  data: ResearchResponse;
  onNewSearch: () => void;
}

type TabType = 'overview' | 'report' | 'critic' | 'sources' | 'scraped';

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ data, onNewSearch }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const parsedSources = parseSearchResults(data.search_results);

  const TABS = [
    { id: 'overview', label: 'Overview', icon: Layers },
    { id: 'report', label: 'Report', icon: FileText, badge: 'Main' },
    { id: 'critic', label: 'Critic Review', icon: ShieldCheck },
    { id: 'sources', label: 'Sources & Search', icon: Link2, count: parsedSources.length },
    { id: 'scraped', label: 'Source Notes', icon: BookOpen },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-6">
      
      {/* Topic Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-surface-900/80 border border-surface-800 shadow-xl backdrop-blur-xl">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-400 mb-1 uppercase tracking-wider">
            <span>Research Dossier</span>
            <span>•</span>
            <span className="text-surface-400 font-sans">Multi-Agent Synthesis Complete</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-surface-100 truncate tracking-tight">
            {data.topic}
          </h1>
        </div>

        <button
          type="button"
          onClick={onNewSearch}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-surface-800 hover:bg-surface-700 text-surface-200 border border-surface-700 hover:border-brand-500/40 transition-all active:scale-95 whitespace-nowrap shadow-sm"
        >
          <RotateCcw className="w-4 h-4 text-brand-400" />
          <span>New Research</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-surface-800 scrollbar-none">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap ${
                isActive
                  ? 'bg-brand-500/10 text-brand-300 border border-brand-500/30 shadow-sm'
                  : 'text-surface-400 hover:text-surface-200 hover:bg-surface-850/60 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-surface-500'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-brand-500/20 text-brand-300 font-mono">
                  {tab.badge}
                </span>
              )}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-surface-800 text-surface-400 font-mono">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 1. Main Report */}
          <ReportViewer topic={data.topic} report={data.report} />

          {/* 2. Critic Evaluation Card */}
          <CriticCard feedback={data.feedback} />

          {/* 3. Extracted Sources */}
          <SourcesList sources={parsedSources} />

          {/* 4. Search Results Details */}
          <SearchResults items={parsedSources} rawSearchResults={data.search_results} />

          {/* 5. Scraped Content Accordion */}
          <ScrapedContent content={data.scraped_content} />
        </div>
      )}

      {activeTab === 'report' && (
        <div className="space-y-6">
          <ReportViewer topic={data.topic} report={data.report} />
        </div>
      )}

      {activeTab === 'critic' && (
        <div className="space-y-6">
          <CriticCard feedback={data.feedback} />
        </div>
      )}

      {activeTab === 'sources' && (
        <div className="space-y-6">
          <SourcesList sources={parsedSources} />
          <SearchResults items={parsedSources} rawSearchResults={data.search_results} />
        </div>
      )}

      {activeTab === 'scraped' && (
        <div className="space-y-6">
          <ScrapedContent content={data.scraped_content} />
        </div>
      )}
    </div>
  );
};
