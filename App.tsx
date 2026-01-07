import React, { useState, useRef } from 'react';
import { analyzeMedia } from './services/geminiService';
import { AppState, AnalysisResult } from './types';
import AnalysisDisplay from './components/AnalysisDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { Upload, FileVideo, FileAudio, Info, ShieldAlert } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate type (basic check, though input accept handles most)
    if (!file.type.startsWith('video/') && !file.type.startsWith('audio/')) {
      setErrorMsg("请上传视频或音频文件。");
      return;
    }

    setFileName(file.name);
    setErrorMsg("");
    setState(AppState.ANALYZING);

    try {
      const data = await analyzeMedia(file);
      setResult(data);
      setState(AppState.SUCCESS);
    } catch (err) {
      console.error(err);
      setErrorMsg("分析过程中发生错误，请稍后重试或检查文件是否过大。");
      setState(AppState.ERROR);
    }
  };

  const handleRetry = () => {
    setState(AppState.IDLE);
    setResult(null);
    setFileName("");
    setErrorMsg("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100">
      <header className="bg-slate-900 text-yellow-300 p-6 shadow-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-yellow-400 rounded-lg text-slate-900">
              <Info className="w-8 h-8" />
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">EmoSense 社交助手</h1>
              <p className="text-sm text-yellow-100 opacity-90">为视障人士打造的情绪分析专家</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 md:p-12">
        {state === AppState.IDLE && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in text-center space-y-8">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                看见听不见的情绪，<br/>
                读懂言外之意。
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                上传社交互动视频或音频，我们将运用 <span className="font-bold text-indigo-700">7-38-55法则</span> 为您解析对方的真实情感、潜台词及隐藏的讽刺。
              </p>
            </div>

            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border-2 border-dashed border-slate-300 hover:border-indigo-500 transition-colors cursor-pointer group focus-within:ring-4 focus-within:ring-indigo-200">
              <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
                <div className="p-6 bg-indigo-50 rounded-full mb-4 group-hover:bg-indigo-100 transition-colors">
                  <Upload className="w-12 h-12 text-indigo-600" />
                </div>
                <span className="text-xl font-bold text-slate-800 mb-2">点击上传文件</span>
                <span className="text-slate-500 text-base">支持 MP4, MOV, MP3, WAV 等格式</span>
                <input 
                  id="file-upload" 
                  type="file" 
                  ref={fileInputRef}
                  accept="video/*,audio/*" 
                  className="sr-only" 
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="flex gap-8 text-slate-500 text-sm font-medium">
              <div className="flex items-center gap-2">
                <FileVideo className="w-5 h-5" />
                <span>视频分析 (推荐)</span>
              </div>
              <div className="flex items-center gap-2">
                <FileAudio className="w-5 h-5" />
                <span>音频分析</span>
              </div>
            </div>
          </div>
        )}

        {state === AppState.ANALYZING && <LoadingSpinner />}

        {state === AppState.ERROR && (
          <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-r-lg shadow-sm" role="alert">
            <div className="flex items-start gap-4">
              <ShieldAlert className="w-8 h-8 text-red-600 shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-red-900 mb-2">分析失败</h3>
                <p className="text-red-800 text-lg mb-6">{errorMsg}</p>
                <button 
                  onClick={handleRetry}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-colors focus:ring-4 focus:ring-red-300"
                >
                  重试
                </button>
              </div>
            </div>
          </div>
        )}

        {state === AppState.SUCCESS && result && (
          <div className="space-y-8">
            <div className="flex justify-between items-center bg-slate-100 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-slate-700">
                <FileVideo className="w-5 h-5" />
                <span className="font-medium">当前分析文件: {fileName}</span>
              </div>
              <button 
                onClick={handleRetry}
                className="text-indigo-600 font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded px-2"
              >
                分析新文件
              </button>
            </div>
            <AnalysisDisplay result={result} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;