import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AgentNotesSectionProps {
  scenario: 'auto_approve' | 'direct_escalation' | 'agent_reassessment';
  localNotes: string;
  setLocalNotes: (notes: string) => void;
  currentTotal: number;
  formatCurrency: (amount: number) => string;
}

export default function AgentNotesSection({
  scenario,
  localNotes,
  setLocalNotes,
  currentTotal,
  formatCurrency
}: AgentNotesSectionProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    policyholder: false,
    seniorAdjuster: true,
    internal: false
  });

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCheckbox = (itemId: string) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  if (scenario === 'auto_approve') {
    return (
      <div className="space-y-4">
        <div className="bg-[#EFF6FF] border-2 border-[#3B82F6] rounded-lg">
          <button
            onClick={() => toggleSection('policyholder')}
            className="w-full px-4 py-3 flex items-center justify-between text-left"
          >
            <span className="font-semibold text-[#1E3A8A]">FOR POLICYHOLDER</span>
            {expandedSections.policyholder ? <ChevronUp className="w-4 h-4 text-[#3B82F6]" /> : <ChevronDown className="w-4 h-4 text-[#3B82F6]" />}
          </button>
          {expandedSections.policyholder && (
            <div className="px-4 pb-4 space-y-3">
              <label className="flex items-start gap-3 text-sm text-[#1E40AF]">
                <input
                  type="checkbox"
                  checked={checkedItems['ph1'] || false}
                  onChange={() => toggleCheckbox('ph1')}
                  className="mt-1 accent-[#3B82F6]"
                />
                <span>Your claim has been approved for {formatCurrency(currentTotal)}. This covers front bumper dent repair ($850), passenger door scratch repair ($520), and hood paint touch-up ($450). You can schedule repairs at any of our recommended shops. Estimated repair time: 2 business days.</span>
              </label>
              <label className="flex items-start gap-3 text-sm text-[#1E40AF]">
                <input
                  type="checkbox"
                  checked={checkedItems['ph2'] || false}
                  onChange={() => toggleCheckbox('ph2')}
                  className="mt-1 accent-[#3B82F6]"
                />
                <span>No deductible information shown - verify with policyholder if applicable</span>
              </label>
            </div>
          )}
        </div>

        <div className="bg-[#F3F4F6] border-2 border-[#9CA3AF] rounded-lg">
          <button
            onClick={() => toggleSection('internal')}
            className="w-full px-4 py-3 flex items-center justify-between text-left"
          >
            <span className="font-semibold text-[#374151]">FOR INTERNAL RECORDS</span>
            {expandedSections.internal ? <ChevronUp className="w-4 h-4 text-[#6B7280]" /> : <ChevronDown className="w-4 h-4 text-[#6B7280]" />}
          </button>
          {expandedSections.internal && (
            <div className="px-4 pb-4 space-y-3">
              <label className="flex items-start gap-3 text-sm text-[#4B5563]">
                <input
                  type="checkbox"
                  checked={checkedItems['int1'] || false}
                  onChange={() => toggleCheckbox('int1')}
                  className="mt-1 accent-[#6B7280]"
                />
                <span>Claim auto-approved via AI assessment. All damage detections above 90% confidence threshold. Total cost {formatCurrency(currentTotal)} below $2,000 auto-approval limit. Processing time: 8 minutes. Authorization code: AUTO-20241118-001</span>
              </label>
              <label className="flex items-start gap-3 text-sm text-[#4B5563]">
                <input
                  type="checkbox"
                  checked={checkedItems['int2'] || false}
                  onChange={() => toggleCheckbox('int2')}
                  className="mt-1 accent-[#6B7280]"
                />
                <span>Recommended shops: Golden Gate Auto Body (0.8 mi), Bay Area Collision (1.2 mi)</span>
              </label>
            </div>
          )}
        </div>

        <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-lg p-4">
          <h4 className="font-semibold text-[#92400E] mb-3">AGENT VERIFICATION REQUIRED</h4>
          <div className="space-y-2">
            <label className="flex items-start gap-3 text-sm text-[#78350F]">
              <input
                type="checkbox"
                checked={checkedItems['ver1'] || false}
                onChange={() => toggleCheckbox('ver1')}
                className="mt-1 accent-[#F59E0B]"
              />
              <span>I have reviewed all damage detections and they appear accurate</span>
            </label>
            <label className="flex items-start gap-3 text-sm text-[#78350F]">
              <input
                type="checkbox"
                checked={checkedItems['ver2'] || false}
                onChange={() => toggleCheckbox('ver2')}
                className="mt-1 accent-[#F59E0B]"
              />
              <span>I have confirmed repair costs are reasonable for this vehicle/damage type</span>
            </label>
            <label className="flex items-start gap-3 text-sm text-[#78350F]">
              <input
                type="checkbox"
                checked={checkedItems['ver3'] || false}
                onChange={() => toggleCheckbox('ver3')}
                className="mt-1 accent-[#F59E0B]"
              />
              <span>I have verified policyholder zip code for shop recommendations</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Additional notes (optional)
          </label>
          <textarea
            value={localNotes}
            onChange={(e) => setLocalNotes(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-[#252B36] border border-[#2D3748] rounded-lg text-white text-sm placeholder-[#718096] focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
            placeholder="Add any additional context..."
          />
        </div>
      </div>
    );
  }

  if (scenario === 'direct_escalation') {
    return (
      <div className="space-y-4">
        <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-lg">
          <button
            onClick={() => toggleSection('seniorAdjuster')}
            className="w-full px-4 py-3 flex items-center justify-between text-left"
          >
            <span className="font-semibold text-[#92400E]">FOR SENIOR ADJUSTER</span>
            {expandedSections.seniorAdjuster ? <ChevronUp className="w-4 h-4 text-[#F59E0B]" /> : <ChevronDown className="w-4 h-4 text-[#F59E0B]" />}
          </button>
          {expandedSections.seniorAdjuster && (
            <div className="px-4 pb-4 space-y-3">
              <label className="flex items-start gap-3 text-sm text-[#78350F]">
                <input
                  type="checkbox"
                  checked={checkedItems['sa1'] || false}
                  onChange={() => toggleCheckbox('sa1')}
                  className="mt-1 accent-[#F59E0B]"
                />
                <span>AI detected severe structural damage to front bumper with 91% confidence. Total repair estimate: {formatCurrency(currentTotal)} (includes $2,800 for bumper structural repair, $1,200 for fender work, $650 for hood paint). AI recommendation: Approve with in-person shop inspection. No fraud flags detected.</span>
              </label>
              <label className="flex items-start gap-3 text-sm text-[#78350F]">
                <input
                  type="checkbox"
                  checked={checkedItems['sa2'] || false}
                  onChange={() => toggleCheckbox('sa2')}
                  className="mt-1 accent-[#F59E0B]"
                />
                <span>Comparable claims: 23 similar structural repairs averaging $4,200. This estimate is within expected range (+11% variance).</span>
              </label>
              <label className="flex items-start gap-3 text-sm text-[#78350F]">
                <input
                  type="checkbox"
                  checked={checkedItems['sa3'] || false}
                  onChange={() => toggleCheckbox('sa3')}
                  className="mt-1 accent-[#F59E0B]"
                />
                <span>Recommended shops are all certified for structural work: Bay Area Collision Center (preferred for structural), Golden Gate Auto Body</span>
              </label>
            </div>
          )}
        </div>

        <div className="bg-[#EFF6FF] border-2 border-[#3B82F6] rounded-lg">
          <button
            onClick={() => toggleSection('policyholder')}
            className="w-full px-4 py-3 flex items-center justify-between text-left"
          >
            <span className="font-semibold text-[#1E3A8A]">FOR POLICYHOLDER</span>
            {expandedSections.policyholder ? <ChevronUp className="w-4 h-4 text-[#3B82F6]" /> : <ChevronDown className="w-4 h-4 text-[#3B82F6]" />}
          </button>
          {expandedSections.policyholder && (
            <div className="px-4 pb-4 space-y-3">
              <label className="flex items-start gap-3 text-sm text-[#1E40AF]">
                <input
                  type="checkbox"
                  checked={checkedItems['ph1'] || false}
                  onChange={() => toggleCheckbox('ph1')}
                  className="mt-1 accent-[#3B82F6]"
                />
                <span>Your claim for {formatCurrency(currentTotal)} has been sent to our senior adjuster for review due to the extent of structural damage. This is standard procedure for repairs over $2,000. You'll receive a decision within 24-48 hours. The damage assessment and repair estimate have been completed - the review is for final authorization.</span>
              </label>
            </div>
          )}
        </div>

        <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-lg p-4">
          <h4 className="font-semibold text-[#92400E] mb-3">AGENT VERIFICATION</h4>
          <div className="space-y-2">
            <label className="flex items-start gap-3 text-sm text-[#78350F]">
              <input
                type="checkbox"
                checked={checkedItems['ver1'] || false}
                onChange={() => toggleCheckbox('ver1')}
                className="mt-1 accent-[#F59E0B]"
              />
              <span>I have reviewed the AI damage assessment and it appears accurate</span>
            </label>
            <label className="flex items-start gap-3 text-sm text-[#78350F]">
              <input
                type="checkbox"
                checked={checkedItems['ver2'] || false}
                onChange={() => toggleCheckbox('ver2')}
                className="mt-1 accent-[#F59E0B]"
              />
              <span>I have confirmed this requires senior adjuster approval (cost &gt; $2,000)</span>
            </label>
            <label className="flex items-start gap-3 text-sm text-[#78350F]">
              <input
                type="checkbox"
                checked={checkedItems['ver3'] || false}
                onChange={() => toggleCheckbox('ver3')}
                className="mt-1 accent-[#F59E0B]"
              />
              <span>I have verified structural damage requires certified repair shop</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Policy/Context Notes
          </label>
          <textarea
            value={localNotes || "Policyholder mentioned previous minor repair to same bumper 6 months ago - may be relevant for senior adjuster review. No pre-existing damage visible in current images."}
            onChange={(e) => setLocalNotes(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-[#252B36] border border-[#2D3748] rounded-lg text-white text-sm placeholder-[#718096] focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Additional notes (optional)
          </label>
          <textarea
            rows={2}
            className="w-full px-4 py-3 bg-[#252B36] border border-[#2D3748] rounded-lg text-white text-sm placeholder-[#718096] focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
            placeholder="Add any additional context..."
          />
        </div>
      </div>
    );
  }

  // agent_reassessment scenario
  return (
    <div className="space-y-4">
      <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-lg p-4">
        <h4 className="font-semibold text-[#92400E] mb-3">ITEMS FLAGGED FOR YOUR REVIEW</h4>
        <div className="bg-[#FEF9E6] border border-[#F59E0B] rounded-lg p-3 mb-3">
          <p className="text-sm text-[#92400E] font-semibold mb-1">⚠️ Rear Bumper - Dent (68% confidence)</p>
          <p className="text-xs text-[#78350F]">AI uncertain if severity is MINOR or MODERATE. Please verify and adjust if needed.</p>
        </div>
      </div>

      <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-lg">
        <button
          onClick={() => toggleSection('seniorAdjuster')}
          className="w-full px-4 py-3 flex items-center justify-between text-left"
        >
          <span className="font-semibold text-[#92400E]">FOR SENIOR ADJUSTER (if escalated)</span>
          {expandedSections.seniorAdjuster ? <ChevronUp className="w-4 h-4 text-[#F59E0B]" /> : <ChevronDown className="w-4 h-4 text-[#F59E0B]" />}
        </button>
        {expandedSections.seniorAdjuster && (
          <div className="px-4 pb-4 space-y-3">
            <label className="flex items-start gap-3 text-sm text-[#78350F]">
              <input
                type="checkbox"
                checked={checkedItems['sa1'] || false}
                onChange={() => toggleCheckbox('sa1')}
                className="mt-1 accent-[#F59E0B]"
              />
              <span>Agent reviewed AI assessment and adjusted rear bumper severity from MINOR to MODERATE based on professional judgment. New total estimate: {formatCurrency(currentTotal)} (exceeds auto-approval threshold). Recommend approval as agent assessment appears accurate based on image.</span>
            </label>
          </div>
        )}
      </div>

      <div className="bg-[#EFF6FF] border-2 border-[#3B82F6] rounded-lg">
        <button
          onClick={() => toggleSection('policyholder')}
          className="w-full px-4 py-3 flex items-center justify-between text-left"
        >
          <span className="font-semibold text-[#1E3A8A]">FOR POLICYHOLDER (if escalated)</span>
          {expandedSections.policyholder ? <ChevronUp className="w-4 h-4 text-[#3B82F6]" /> : <ChevronDown className="w-4 h-4 text-[#3B82F6]" />}
        </button>
        {expandedSections.policyholder && (
          <div className="px-4 pb-4 space-y-3">
            <label className="flex items-start gap-3 text-sm text-[#1E40AF]">
              <input
                type="checkbox"
                checked={checkedItems['ph1'] || false}
                onChange={() => toggleCheckbox('ph1')}
                className="mt-1 accent-[#3B82F6]"
              />
              <span>Your claim requires additional review by our senior adjuster due to the repair cost estimate ({formatCurrency(currentTotal)}). You'll receive a decision within 24-48 hours. We'll notify you as soon as it's approved.</span>
            </label>
          </div>
        )}
      </div>

      <div className="bg-[#D1FAE5] border-2 border-[#10B981] rounded-lg p-4">
        <h4 className="font-semibold text-[#065F46] mb-2">AI LEARNING</h4>
        <label className="flex items-start gap-3 text-sm text-[#047857]">
          <input
            type="checkbox"
            checked={checkedItems['ai1'] || false}
            onChange={() => toggleCheckbox('ai1')}
            className="mt-1 accent-[#10B981]"
          />
          <span>Your correction will improve AI accuracy for similar rear-end damage patterns (estimated 15% improvement for this damage type)</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Reasoning <span className="text-[#EF4444]">*Required</span>
        </label>
        <textarea
          value={localNotes || "Adjusted severity to MODERATE based on damage depth visible in image. Requires full bumper repair, not just surface work."}
          onChange={(e) => setLocalNotes(e.target.value)}
          rows={3}
          required
          className="w-full px-4 py-3 bg-[#252B36] border border-[#2D3748] rounded-lg text-white text-sm placeholder-[#718096] focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Additional context (optional)
        </label>
        <textarea
          rows={2}
          className="w-full px-4 py-3 bg-[#252B36] border border-[#2D3748] rounded-lg text-white text-sm placeholder-[#718096] focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
          placeholder="Add any additional context..."
        />
      </div>
    </div>
  );
}
