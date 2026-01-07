import React from 'react';
import { AnalysisResult, HiddenCue } from '../types';
import { Eye, Ear, MessageSquare, AlertCircle, Heart, Lightbulb } from 'lucide-react';

interface AnalysisDisplayProps {
  result: AnalysisResult;
}

const CueCard: React.FC<{ cue: HiddenCue }> = ({ cue }) => (
  <div className="bg-white border-l-4 border-indigo-500 shadow-md rounded-r-lg p-6 mb-6 focus-within:ring-2 focus-within:ring-indigo-500 transition-all hover:shadow-lg">
    <div className="flex justify-between items-baseline mb-3">
      <span className="bg-slate-900 text-white px-3 py-1 rounded text-sm font-bold tracking-wide" aria-label={`时间点 ${cue.timestamp}`}>
        ⏱ {cue.timestamp}
      </span>
    </div>
    
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <MessageSquare className="w-6 h-6 text-slate-500 mt-1 shrink-0" aria-hidden="true" />
        <div>
          <span className="sr-only">语音内容:</span>
          <p className="text-lg font-medium text-slate-800">"{cue.spoken_text}"</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-md">
          <Eye className="w-5 h-5 text-blue-700 mt-1 shrink-0" aria-hidden="true" />
          <div>
            <span className="text-sm font-bold text-blue-900 block mb-1">视觉表情</span>
            <p className="text-slate-700">{cue.visual_expression}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 bg-purple-50 p-3 rounded-md">
          <Ear className="w-5 h-5 text-purple-700 mt-1 shrink-0" aria-hidden="true" />
          <div>
            <span className="text-sm font-bold text-purple-900 block mb-1">听觉语调</span>
            <p className="text-slate-700">{cue.audio_tone}</p>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-md border border-amber-100">
        <AlertCircle className="w-6 h-6 text-amber-700 mt-1 shrink-0" aria-hidden="true" />
        <div>
          <span className="text-sm font-bold text-amber-900 block mb-1">专家解读 (潜台词)</span>
          <p className="text-slate-800 font-medium leading-relaxed">{cue.interpretation}</p>
        </div>
      </div>
    </div>
  </div>
);

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in" aria-live="polite">
      
      {/* Header Section */}
      <section className="bg-white p-8 rounded-xl shadow-lg border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b-2 border-slate-100 pb-4">分析报告</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-2">对话概要</h3>
            <p className="text-xl text-slate-800 leading-relaxed">{result.summary}</p>
          </div>
          
          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm uppercase tracking-wider text-indigo-800 font-bold">主导情绪</h3>
            </div>
            <p className="text-2xl font-bold text-indigo-900">{result.dominant_emotion}</p>
          </div>
        </div>
      </section>

      {/* Hidden Cues Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-slate-900 rounded-full">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            隐藏线索与差异 <span className="text-sm font-normal text-slate-500 ml-2">(7-38-55法则分析)</span>
          </h2>
        </div>
        
        <div className="space-y-2">
          {result.hidden_cues.map((cue, index) => (
            <CueCard key={index} cue={cue} />
          ))}
        </div>
      </section>

      {/* Advice Section */}
      <section className="bg-green-50 p-8 rounded-xl border border-green-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-100 rounded-full shrink-0">
            <Lightbulb className="w-8 h-8 text-green-700" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-green-900 mb-3">社交建议</h2>
            <p className="text-lg text-green-800 leading-relaxed font-medium">
              {result.social_advice}
            </p>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default AnalysisDisplay;