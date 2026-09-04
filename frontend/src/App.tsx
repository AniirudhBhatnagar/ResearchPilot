import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ResearchInput } from './components/ResearchInput';
import { ResearchProgress } from './components/ResearchProgress';
import { ResultsDashboard } from './components/ResultsDashboard';
import { ErrorCard } from './components/ErrorCard';
import { ResearchResponse } from './types';
import { Bot, Terminal, Cpu } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function App() {
  const [topic, setTopic] = useState<string>('');
  const [activeSearchTopic, setActiveSearchTopic] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<ResearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Check backend health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/health`);
        if (res.ok) {
          setApiStatus('online');
        } else {
          setApiStatus('offline');
        }
      } catch {
        setApiStatus('offline');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (searchTopic: string) => {
    const trimmed = searchTopic.trim();
    if (!trimmed) return;

    setTopic(trimmed);
    setActiveSearchTopic(trimmed);
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/research`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: trimmed }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Research pipeline failed. Please check your backend connection.');
      }

      const data: ResearchResponse = await response.json();
      setResults(data);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred while executing the research pipeline.';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
    setIsLoading(false);
    setActiveSearchTopic('');
  };

  return (
    <div className="min-h-screen bg-surface-950 text-surface-100 flex flex-col relative selection:bg-brand-500/30 selection:text-brand-200">
      
      {/* Background Ambience / Grid Overlay */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-brand-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10"></div>

      {/* Top Header */}
      <Header apiStatus={apiStatus} onReset={handleReset} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-start pb-16">
        {!results && !isLoading && !error && (
          <div className="space-y-4 my-auto py-12">
            <Hero />
            <ResearchInput onSearch={handleSearch} isLoading={isLoading} initialTopic={topic} />
          </div>
        )}

        {/* Loading / Pipeline In Progress State */}
        {isLoading && (
          <div className="my-auto py-8">
            <ResearchProgress topic={activeSearchTopic} />
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="my-auto py-8">
            <ErrorCard message={error} onRetry={() => handleSearch(activeSearchTopic || topic)} />
          </div>
        )}

        {/* Results State */}
        {results && !isLoading && (
          <ResultsDashboard data={results} onNewSearch={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-surface-800/60 py-6 bg-surface-950/60 backdrop-blur-sm text-surface-500 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-brand-400" />
            <span className="font-semibold text-surface-300">ResearchOS</span>
            <span>—</span>
            <span>LangChain Multi-Agent Architecture</span>
          </div>
          
          <div className="flex items-center gap-4 text-surface-400">
            <span className="flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-teal-400" />
              Tavily + Groq
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              FastAPI + React
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
