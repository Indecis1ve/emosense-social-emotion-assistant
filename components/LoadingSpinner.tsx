import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6 text-center" role="status">
      <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">正在深入分析...</h2>
        <p className="text-slate-600 max-w-md mx-auto">
          专家模型正在应用“互补性机制”对比视觉与听觉信号，请稍候。
        </p>
      </div>
      <span className="sr-only">正在分析上传的文件，请稍候。</span>
    </div>
  );
};

export default LoadingSpinner;