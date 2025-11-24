import { Lightbulb, TrendingUp } from 'lucide-react';

export default function FeedbackMetrics() {
  return (
    <div className="bg-[#1A1F26] border border-[#2D3748] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Lightbulb className="w-5 h-5 text-[#10B981] mr-2" />
          <h3 className="text-sm font-bold text-white">AI Improvement Metrics</h3>
        </div>
        <TrendingUp className="w-5 h-5 text-[#10B981]" />
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0F1419]/50 border border-[#2D3748] rounded-lg p-4 text-center">
          <div className="w-12 h-12 rounded-full bg-[#10B981]/20 flex items-center justify-center mx-auto mb-2">
            <span className="text-2xl">💡</span>
          </div>
          <p className="text-3xl font-bold text-[#10B981] mb-1">3</p>
          <p className="text-xs font-semibold text-[#A0AEC0] uppercase tracking-wide">
            Feedback Contributions
          </p>
          <p className="text-xs text-[#718096] mt-1">This Week</p>
        </div>

        <div className="bg-[#0F1419]/50 border border-[#2D3748] rounded-lg p-4 text-center">
          <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-2">
            <span className="text-2xl">📈</span>
          </div>
          <p className="text-3xl font-bold text-[#8B5CF6] mb-1">23%</p>
          <p className="text-xs font-semibold text-[#A0AEC0] uppercase tracking-wide">
            AI Accuracy Gain
          </p>
          <p className="text-xs text-[#718096] mt-1">From Agent Feedback</p>
        </div>

        <div className="bg-[#0F1419]/50 border border-[#2D3748] rounded-lg p-4 text-center">
          <div className="w-12 h-12 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mx-auto mb-2">
            <span className="text-2xl">🎯</span>
          </div>
          <p className="text-3xl font-bold text-[#F59E0B] mb-1">847</p>
          <p className="text-xs font-semibold text-[#A0AEC0] uppercase tracking-wide">
            Total Corrections
          </p>
          <p className="text-xs text-[#718096] mt-1">Improving AI Model</p>
        </div>
      </div>
    </div>
  );
}
