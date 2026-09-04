export interface ResearchRequest {
  topic: string;
}

export interface ResearchResponse {
  topic: string;
  search_results: string;
  scraped_content: string;
  report: string;
  feedback: string;
}

export type PipelineStage = 'idle' | 'searching' | 'reading' | 'writing' | 'critiquing' | 'completed' | 'error';

export interface StageInfo {
  id: PipelineStage;
  label: string;
  agent: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
}

export interface ParsedCriticFeedback {
  rawScore?: string;
  scoreNumber?: number; // e.g., 8.5
  strengths: string[];
  areasToImprove: string[];
  verdict?: string;
  rawText: string;
}

export interface ParsedSourceItem {
  id: string;
  title: string;
  url: string;
  domain: string;
  snippet: string;
}
