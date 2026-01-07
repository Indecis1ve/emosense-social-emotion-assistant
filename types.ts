export interface HiddenCue {
  timestamp: string;
  spoken_text: string;
  visual_expression: string;
  audio_tone: string;
  interpretation: string;
}

export interface AnalysisResult {
  summary: string;
  dominant_emotion: string;
  hidden_cues: HiddenCue[];
  social_advice: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}