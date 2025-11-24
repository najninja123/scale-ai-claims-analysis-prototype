import { RefreshCw } from 'lucide-react';

interface ScenarioSelectorProps {
  currentScenario: string;
  onScenarioChange: (scenario: string) => void;
  isCompletionPage?: boolean;
}

export default function ScenarioSelector({
  currentScenario,
  onScenarioChange,
  isCompletionPage = false
}: ScenarioSelectorProps) {
  const scenarios = [
    {
      value: 'auto_approve',
      label: 'Low Cost + High Confidence (Auto-Approve)',
      completionLabel: 'Auto-Approved (Low Cost + High Confidence)'
    },
    {
      value: 'direct_escalation',
      label: 'High Cost + High Confidence (Direct Escalation)',
      completionLabel: 'Escalated (High Cost + High Confidence)'
    },
    {
      value: 'agent_reassessment',
      label: 'Low Cost + Low Confidence (Agent Re-Assessment)',
      completionLabel: 'Escalated After Agent Review (Low Cost + Low Confidence)'
    }
  ];

  return (
    <div className="bg-[#F3F4F6] border-2 border-[#9CA3AF] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-6 mb-6">
      <div className="flex items-center mb-4">
        <RefreshCw className="w-5 h-5 text-[#6B7280] mr-2" />
        <h3 className="text-lg font-bold text-[#374151]">
          {isCompletionPage ? 'View Completion for Different Scenarios' : 'Demo Scenario Selector'}
        </h3>
      </div>
      <div className="h-px bg-[#9CA3AF]/30 mb-4"></div>

      <div className="mb-3">
        <label className="block text-sm font-semibold text-[#4B5563] mb-2">
          Scenario:
        </label>
        <select
          value={currentScenario}
          onChange={(e) => onScenarioChange(e.target.value)}
          className="w-full px-4 py-3 bg-white border-2 border-[#9CA3AF] rounded-lg text-[#1F2937] text-base font-medium focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all cursor-pointer hover:border-[#6B7280]"
        >
          {scenarios.map(scenario => (
            <option key={scenario.value} value={scenario.value}>
              {isCompletionPage ? scenario.completionLabel : scenario.label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-xs text-[#6B7280] italic">
        {isCompletionPage
          ? 'Preview different completion states based on claim scenario'
          : 'Use this to preview different claim scenarios for demo purposes'}
      </p>
    </div>
  );
}
