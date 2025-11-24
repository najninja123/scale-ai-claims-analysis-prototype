import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, Lightbulb, TrendingUp, Plus, Minus } from 'lucide-react';

interface DamageItemCardProps {
  damage: any;
  adjustedDamage: any;
  isAgentReassessment: boolean;
  onAdjustment: (field: string, value: any) => void;
  formatCurrency: (amount: number) => string;
  getSeverityColor: (severity: string) => any;
  getConfidenceDisplay: (confidence: number) => any;
}

export default function DamageItemCard({
  damage,
  adjustedDamage,
  isAgentReassessment,
  onAdjustment,
  formatCurrency,
  getSeverityColor,
  getConfidenceDisplay
}: DamageItemCardProps) {
  const [showContext, setShowContext] = useState(false);
  const [contextNote, setContextNote] = useState('');
  const [reviewConfirmed, setReviewConfirmed] = useState(false);
  const [showFeedbackCapture, setShowFeedbackCapture] = useState(false);
  const [showContextSaved, setShowContextSaved] = useState(false);
  const [showAgentNotes, setShowAgentNotes] = useState(false);
  const [agentNote, setAgentNote] = useState('');
  const [showNoteSaved, setShowNoteSaved] = useState(false);

  const severityColors = getSeverityColor(adjustedDamage.severity);
  const confidenceDisplay = getConfidenceDisplay(damage.confidence);
  const isLowConfidence = damage.confidence < 0.90;
  const needsReview = isAgentReassessment && damage.needs_review;

  const hasAdjustments = adjustedDamage.severity !== damage.severity || adjustedDamage.cost !== damage.estimated_cost;

  // Show feedback capture when adjustments are made
  useEffect(() => {
    if (hasAdjustments && needsReview) {
      setShowFeedbackCapture(true);
    }
  }, [hasAdjustments, needsReview]);

  // Show context saved indicator with debounce
  useEffect(() => {
    if (contextNote.length > 10) {
      setShowContextSaved(true);
      const timer = setTimeout(() => setShowContextSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [contextNote]);

  // Auto-save agent notes with debounce
  useEffect(() => {
    if (agentNote.length > 0) {
      const saveTimer = setTimeout(() => {
        // Auto-save logic here (would call API in production)
        setShowNoteSaved(true);
        const hideTimer = setTimeout(() => setShowNoteSaved(false), 3000);
        return () => clearTimeout(hideTimer);
      }, 1000);
      return () => clearTimeout(saveTimer);
    }
  }, [agentNote]);

  return (
    <div className={`bg-[#0F1419]/50 border-2 rounded-xl p-6 transition-all ${
      needsReview
        ? 'border-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.3)]'
        : 'border-[#2D3748]'
    }`}>
      {needsReview && (
        <div className="flex items-center mb-4 pb-4 border-b border-[#F59E0B]/30">
          <div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mr-3">
            <AlertTriangle className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#F59E0B] uppercase tracking-wide">
              ⚠️ REQUIRES REVIEW - Low Confidence
            </h4>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="text-xl font-bold text-white mb-2">
            {damage.location} - {damage.damage_type}
          </h4>

          {needsReview && (
            <div className="mb-4 p-3 bg-[#FEF3C7] border border-[#F59E0B] rounded-lg">
              <p className="text-xs font-semibold text-[#92400E] mb-1">AI Initial Assessment:</p>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm text-[#78350F]">
                  Severity: {damage.severity}
                </span>
                <span className="text-sm text-[#78350F]">
                  Confidence: {Math.round(damage.confidence * 100)}% ⚠️ LOW
                </span>
              </div>
              <p className="text-sm text-[#78350F]">
                Estimated Cost: {formatCurrency(damage.estimated_cost)}
              </p>
            </div>
          )}

          {!needsReview && (
            <div className="flex items-center gap-4 mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${severityColors.bg} ${severityColors.text}`}>
                {adjustedDamage.severity}
              </span>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${confidenceDisplay.dot}`}></div>
                <span className={`text-sm font-semibold ${confidenceDisplay.color}`}>
                  {Math.round(damage.confidence * 100)}% confident
                </span>
              </div>
            </div>
          )}

          {needsReview ? (
            <div className="mt-4 p-4 bg-[#FEF9E6] border-2 border-[#F59E0B] rounded-lg">
              <p className="text-sm font-bold text-[#92400E] mb-3">
                ⚠️ ACTION REQUIRED: Please review and confirm
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#92400E] mb-2">
                    Your Assessment - Severity:
                  </label>
                  <select
                    value={adjustedDamage.severity}
                    onChange={(e) => onAdjustment('severity', e.target.value)}
                    className="w-full px-3 py-2 bg-white border-2 border-[#F59E0B] rounded-lg text-[#1F2937] text-sm font-medium focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B]"
                  >
                    <option value="Minor">Minor</option>
                    <option value="Moderate">Moderate {damage.severity === 'Moderate' && '← AI\'s assessment'}</option>
                    <option value="Severe">Severe</option>
                  </select>
                  {adjustedDamage.severity !== damage.severity && (
                    <p className="text-xs text-[#10B981] mt-1 flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Changed from {damage.severity} to {adjustedDamage.severity}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#92400E] mb-2">
                    Adjusted Cost:
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-[#6B7280]">$</span>
                    <input
                      type="number"
                      value={adjustedDamage.cost}
                      onChange={(e) => onAdjustment('cost', Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 bg-white border-2 border-[#F59E0B] rounded-lg text-[#1F2937] text-sm font-medium focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B]"
                      min="0"
                    />
                  </div>
                  {adjustedDamage.cost !== damage.estimated_cost && (
                    <p className="text-xs text-[#10B981] mt-1 flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Adjusted by {formatCurrency(adjustedDamage.cost - damage.estimated_cost)}
                    </p>
                  )}
                </div>

                {damage.review_reason && (
                  <div className="p-3 bg-[#FEF3C7] border border-[#F59E0B] rounded-lg">
                    <p className="text-xs font-semibold text-[#92400E] mb-1">Why AI is uncertain:</p>
                    <p className="text-xs text-[#78350F] italic">
                      {damage.review_reason}
                    </p>
                    <div className="mt-3 pt-3 border-t border-[#F59E0B]/30">
                      <p className="text-xs font-semibold text-[#92400E] mb-1 flex items-center">
                        <Lightbulb className="w-4 h-4 mr-1" />
                        💡 AI Learning Opportunity:
                      </p>
                      <p className="text-xs text-[#78350F] leading-relaxed">
                        When you correct this assessment, the AI will learn to better identify moderate vs minor damage at this angle. Your expertise fills a gap in the AI's training data.
                      </p>
                    </div>
                  </div>
                )}

                {showFeedbackCapture && hasAdjustments && (
                  <div className="p-4 bg-[#10B981]/10 border-2 border-[#10B981] rounded-lg animate-fade-in">
                    <style>
                      {`
                        @keyframes fade-in {
                          from { opacity: 0; transform: translateY(-10px); }
                          to { opacity: 1; transform: translateY(0); }
                        }
                        @keyframes pulse-green {
                          0%, 100% { opacity: 1; }
                          50% { opacity: 0.5; }
                        }
                        .animate-fade-in {
                          animation: fade-in 0.3s ease-out;
                        }
                        .animate-pulse-green {
                          animation: pulse-green 2s ease-in-out infinite;
                        }
                      `}
                    </style>
                    <p className="text-sm font-bold text-[#065F46] mb-2 flex items-center">
                      <CheckCircle2 className="w-5 h-5 mr-2 animate-pulse-green" />
                      ✓ Feedback Captured
                    </p>
                    <div className="h-px bg-[#10B981]/30 mb-2"></div>
                    <p className="text-xs text-[#065F46] mb-2">
                      Your correction will improve AI accuracy for:
                    </p>
                    <ul className="text-xs text-[#065F46] space-y-1 ml-4">
                      <li>• Rear bumper dent assessments (+15% estimated)</li>
                      <li>• Similar damage at this angle</li>
                      <li>• Cost estimates for moderate severity repairs</li>
                    </ul>
                    <p className="text-xs text-[#047857] mt-2 italic">
                      This feedback will be included in the next quarterly model retraining cycle.
                    </p>
                  </div>
                )}

                <label className="flex items-start gap-3 text-sm text-[#78350F] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reviewConfirmed}
                    onChange={(e) => setReviewConfirmed(e.target.checked)}
                    className="mt-1 accent-[#F59E0B] cursor-pointer"
                  />
                  <span className="font-semibold">
                    I have carefully reviewed this item and confirm my assessment above
                  </span>
                </label>
              </div>
            </div>
          ) : (
            <div className="text-2xl font-bold text-white mb-2">
              {formatCurrency(adjustedDamage.cost)}
            </div>
          )}

          {!needsReview && damage.review_reason && (
            <p className="text-sm text-[#F59E0B] mb-3 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              {damage.review_reason}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#2D3748]">
        <button
          onClick={() => setShowContext(!showContext)}
          className="flex items-center text-sm text-[#A0AEC0] hover:text-white transition-colors"
        >
          {showContext ? (
            <ChevronUp className="w-4 h-4 mr-2" />
          ) : (
            <ChevronDown className="w-4 h-4 mr-2" />
          )}
          {showContext ? 'Hide Context' : '+ Add Context for Senior Adjuster (Optional)'}
        </button>

        {showContext && (
          <div className="mt-3 p-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg">
            <h5 className="text-sm font-bold text-[#1E3A8A] mb-2">
              Additional Context for Senior Adjuster
            </h5>
            <textarea
              value={contextNote}
              onChange={(e) => setContextNote(e.target.value.slice(0, 200))}
              rows={3}
              maxLength={200}
              className="w-full px-3 py-2 bg-white border border-[#BFDBFE] rounded-lg text-[#1E40AF] text-sm placeholder-[#60A5FA] focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all"
              placeholder='Example: "Damage appears fresh - no rust or weathering. Policyholder mentioned incident occurred yesterday."'
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-[#1E40AF]">
                This note will be included in senior adjuster review package if claim is escalated.
              </p>
              <p className="text-xs text-[#60A5FA]">
                {contextNote.length}/200
              </p>
            </div>
            {showContextSaved && (
              <div className="mt-3 p-2 bg-[#D1FAE5] border border-[#10B981] rounded-lg animate-fade-in">
                <p className="text-xs text-[#065F46] flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  ✓ Context saved - This will help senior adjusters and improve AI
                </p>
              </div>
            )}
          </div>
        )}

        {/* Agent Notes Section - Available for ALL scenarios and ALL items */}
        <div className="mt-4">
          <button
            onClick={() => setShowAgentNotes(!showAgentNotes)}
            className={`w-full p-3 rounded-lg border transition-all ${
              showAgentNotes
                ? 'bg-[#F3F4F6] border-[#8B5CF6] hover:bg-[#E5E7EB]'
                : 'bg-[#F3F4F6] border-[#D1D5DB] hover:bg-[#E5E7EB]'
            } cursor-pointer flex items-center justify-between`}
          >
            <div className="flex items-center">
              {showAgentNotes ? (
                <Minus className={`w-4 h-4 mr-2 ${showAgentNotes ? 'text-[#8B5CF6]' : 'text-[#6B7280]'}`} />
              ) : (
                <Plus className={`w-4 h-4 mr-2 ${showAgentNotes ? 'text-[#8B5CF6]' : 'text-[#6B7280]'}`} />
              )}
              <span className={`text-sm font-medium ${showAgentNotes ? 'text-[#8B5CF6]' : 'text-[#6B7280]'}`}>
                Agent Notes (Optional)
              </span>
            </div>
          </button>

          {showAgentNotes && (
            <div className="mt-3 p-4 bg-[#F3F4F6] border border-[#8B5CF6] rounded-lg">
              <p className="text-sm font-semibold text-[#1F2937] mb-2">
                Add your observations or context:
              </p>
              <textarea
                value={agentNote}
                onChange={(e) => setAgentNote(e.target.value.slice(0, 300))}
                rows={3}
                maxLength={300}
                className="w-full px-3 py-2 bg-white border border-[#D1D5DB] rounded-lg text-[#1F2937] text-sm placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all resize-y"
                placeholder="Add observations, context, or feedback about this damage..."
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-[#6B7280]">
                  {agentNote.length}/300 characters
                </p>
              </div>

              <div className="mt-3 p-3 bg-white border border-[#D1D5DB] rounded-lg">
                <p className="text-xs font-semibold text-[#6B7280] mb-2">Examples:</p>
                <ul className="text-xs text-[#6B7280] space-y-1">
                  <li>• "Damage appears fresh - no rust visible"</li>
                  <li>• "Policyholder mentioned incident yesterday"</li>
                  <li>• "Similar to claim CLM-2024-089 last month"</li>
                  <li>• "Local shop quotes typically run 15% higher"</li>
                </ul>
              </div>

              <div className="mt-3 p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg flex items-start">
                <Lightbulb className="w-4 h-4 text-[#3B82F6] mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#1E40AF]">
                  Your notes help improve AI accuracy and provide valuable context for future reference
                </p>
              </div>

              {showNoteSaved && (
                <div className="mt-3 p-2 bg-[#D1FAE5] border border-[#10B981] rounded-lg animate-fade-in">
                  <p className="text-xs text-[#065F46] flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    ✓ Note captured - This will be saved for:
                  </p>
                  <ul className="text-xs text-[#065F46] ml-6 mt-1 space-y-0.5">
                    <li>• Future reference on this claim</li>
                    <li>• AI training to improve accuracy</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
