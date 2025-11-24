import { useState, useEffect } from 'react';
import { AlertTriangle, Info, CheckCircle2, Clock, Shield, TrendingUp, DollarSign, Target, Lightbulb, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';
import AgentNotesSection from './AgentNotesSection';
import ScenarioSelector from './ScenarioSelector';
import DamageItemCard from './DamageItemCard';
import { scenario1AutoApprove, scenario2DirectEscalation, scenario3AgentReassessment } from './ImageUpload';

interface DamageAssessmentProps {
  claimData: any;
  updateClaimData: (updates: any) => void;
}

export default function DamageAssessment({ claimData, updateClaimData }: DamageAssessmentProps) {
  const [currentScenario, setCurrentScenario] = useState(claimData.aiAssessment?.recommendation || 'auto_approve');
  const { aiAssessment, confirmedDamages, agentNotes, adjustedCost } = claimData;
  const [localNotes, setLocalNotes] = useState(agentNotes);
  const [localCost, setLocalCost] = useState(adjustedCost || aiAssessment.cost_estimate.most_likely);
  const [damageAdjustments, setDamageAdjustments] = useState<any>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    policyholder: false,
    seniorAdjuster: true,
    internal: false
  });
  const [damageNotes, setDamageNotes] = useState<Record<number, string>>({});
  const [expandedNotes, setExpandedNotes] = useState<Record<number, boolean>>({});
  const [showNoteSaved, setShowNoteSaved] = useState<Record<number, boolean>>({});

  const isAutoApprove = aiAssessment.recommendation === 'auto_approve';
  const isDirectEscalation = aiAssessment.recommendation === 'direct_escalation';
  const isAgentReassessment = aiAssessment.recommendation === 'agent_reassessment';

  const handleScenarioChange = (newScenario: string) => {
    setCurrentScenario(newScenario);

    // Map scenario to assessment data
    const scenarioMap: Record<string, any> = {
      'auto_approve': scenario1AutoApprove,
      'direct_escalation': scenario2DirectEscalation,
      'agent_reassessment': scenario3AgentReassessment
    };

    const selectedAssessment = scenarioMap[newScenario];
    const allDamageIds = selectedAssessment.damage_detections.map((d: any) => d.id);

    // Update directly without going back to image upload
    updateClaimData({
      aiAssessment: selectedAssessment,
      confirmedDamages: allDamageIds,
      agentNotes: '',
      adjustedCost: selectedAssessment.cost_estimate.most_likely
    });
  };

  useEffect(() => {
    const initialAdjustments: any = {};
    aiAssessment.damage_detections.forEach((damage: any) => {
      initialAdjustments[damage.id] = {
        severity: damage.severity,
        cost: damage.estimated_cost
      };
    });
    setDamageAdjustments(initialAdjustments);
  }, [aiAssessment]);

  const calculateTotalCost = () => {
    return Object.values(damageAdjustments).reduce((sum: number, adj: any) => sum + (adj.cost || 0), 0);
  };

  const handleDamageAdjustment = (damageId: number, field: string, value: any) => {
    const newAdjustments = {
      ...damageAdjustments,
      [damageId]: {
        ...damageAdjustments[damageId],
        [field]: field === 'cost' ? Number(value) : value
      }
    };
    setDamageAdjustments(newAdjustments);

    const newTotal = Object.values(newAdjustments).reduce((sum: number, adj: any) => sum + (adj.cost || 0), 0);
    setLocalCost(newTotal);
  };

  const toggleDamage = (damageId: number) => {
    const newConfirmed = confirmedDamages.includes(damageId)
      ? confirmedDamages.filter((id: number) => id !== damageId)
      : [...confirmedDamages, damageId];

    updateClaimData({ confirmedDamages: newConfirmed });
  };

  const toggleNoteExpansion = (damageId: number) => {
    setExpandedNotes(prev => ({ ...prev, [damageId]: !prev[damageId] }));
  };

  const handleNoteChange = (damageId: number, note: string) => {
    setDamageNotes(prev => ({ ...prev, [damageId]: note }));

    // Auto-save with debounce (simulate)
    if (note.length > 0) {
      setTimeout(() => {
        setShowNoteSaved(prev => ({ ...prev, [damageId]: true }));
        setTimeout(() => {
          setShowNoteSaved(prev => ({ ...prev, [damageId]: false }));
        }, 3000);
      }, 1000);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'minor':
        return { bg: 'bg-[#10B981]/20', text: 'text-[#10B981]', dot: 'bg-[#10B981]' };
      case 'moderate':
        return { bg: 'bg-[#F59E0B]/20', text: 'text-[#F59E0B]', dot: 'bg-[#F59E0B]' };
      case 'severe':
        return { bg: 'bg-[#EF4444]/20', text: 'text-[#EF4444]', dot: 'bg-[#EF4444]' };
      default:
        return { bg: 'bg-[#718096]/20', text: 'text-[#718096]', dot: 'bg-[#718096]' };
    }
  };

  const getConfidenceDisplay = (confidence: number) => {
    if (confidence >= 0.85) {
      return { color: 'text-[#10B981]', dot: 'bg-[#10B981]' };
    }
    if (confidence >= 0.70) {
      return { color: 'text-[#F59E0B]', dot: 'bg-[#F59E0B]' };
    }
    return { color: 'text-[#EF4444]', dot: 'bg-[#EF4444]' };
  };

  const handleDecision = (decision: string) => {
    updateClaimData({
      finalDecision: decision,
      agentNotes: localNotes,
      adjustedCost: localCost,
      damageAdjustments: damageAdjustments,
      currentStep: 4
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const currentTotal = calculateTotalCost();
  const totalExceedsThreshold = currentTotal >= 2000;

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getConfidenceExplanation = () => {
    if (isAutoApprove) {
      return "92% confidence because all damage types (dents, scratches, paint damage) are clearly visible in the image, match common patterns from 847 similar claims, and repair costs align with historical data for this vehicle make/model.";
    }
    if (isDirectEscalation) {
      return "91% confidence because structural damage to the front bumper is clearly identified and matches patterns from 623 similar high-impact collisions. Cost estimate is based on 23 comparable structural repairs with similar damage severity.";
    }
    return "75% confidence (LOW) because the rear bumper dent severity is unclear from the current image angle. AI cannot determine if this is minor ($650) or moderate ($950) damage. Image quality is good, but additional angles would improve accuracy by 15-20%.";
  };

  const costThresholdMet = isAgentReassessment ? currentTotal < 2000 : aiAssessment.approval_analysis.cost_check.actual < 2000;
  const confidenceThresholdMet = aiAssessment.approval_analysis.confidence_threshold_met;

  const itemsNeedingReview = aiAssessment.damage_detections.filter((d: any) => d.needs_review);
  const reviewedItems = itemsNeedingReview.filter((d: any) => damageAdjustments[d.id]?.severity !== d.severity || damageAdjustments[d.id]?.cost !== d.estimated_cost);

  return (
    <div className="space-y-6">
      <ScenarioSelector
        currentScenario={currentScenario}
        onScenarioChange={handleScenarioChange}
      />

      {isAgentReassessment && itemsNeedingReview.length > 0 && (
        <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-6">
          <div className="flex items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center mr-3 flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#92400E] mb-2">⚠️ ACTION REQUIRED</h3>
              <div className="h-px bg-[#F59E0B]/30 mb-3"></div>
              <p className="text-sm text-[#78350F] mb-3">
                This claim has {itemsNeedingReview.length} damage {itemsNeedingReview.length === 1 ? 'item' : 'items'} with low AI confidence.
                Please review carefully and adjust severity/cost if needed.
              </p>
              <div className="mb-3">
                <p className="text-sm font-semibold text-[#92400E] mb-2">Items requiring your review:</p>
                <ul className="space-y-1">
                  {itemsNeedingReview.map((item: any) => (
                    <li key={item.id} className="text-sm text-[#78350F]">
                      • {item.location} - {item.damage_type} ({Math.round(item.confidence * 100)}% confidence)
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-[#78350F] italic">
                Scroll down to review and confirm your assessment.
              </p>
            </div>
          </div>
          <div className="bg-[#FEF9E6] border border-[#F59E0B] rounded-lg p-3">
            <p className="text-sm font-semibold text-[#92400E]">
              Review Status: {reviewedItems.length === 0 ? '⚠️' : reviewedItems.length < itemsNeedingReview.length ? '⚠️' : '✓'} {reviewedItems.length} of {itemsNeedingReview.length} items reviewed
            </p>
          </div>
        </div>
      )}

      <div className="bg-[#8B5CF6]/10 border-2 border-[#8B5CF6]/30 rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-6">
        <h3 className="text-lg font-bold text-white mb-4">Decision Thresholds for Auto-Approval</h3>
        <div className="h-px bg-[#8B5CF6]/30 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-[#8B5CF6] mr-3" />
            <div>
              <p className="text-sm text-[#A0AEC0]">Cost Threshold</p>
              <p className="text-xl font-bold text-white">$2,000</p>
            </div>
          </div>
          <div className="flex items-center">
            <Target className="w-5 h-5 text-[#8B5CF6] mr-3" />
            <div>
              <p className="text-sm text-[#A0AEC0]">Confidence Threshold</p>
              <p className="text-xl font-bold text-white">90%</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1A1F26] border border-[#2D3748] rounded-lg p-4">
          <p className="text-sm text-white mb-2 font-semibold">This Claim:</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <span className="text-white mr-2">
                {isAgentReassessment ? formatCurrency(currentTotal) : formatCurrency(aiAssessment.approval_analysis.cost_check.actual)}
              </span>
              <span className={`font-bold text-lg ${costThresholdMet ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                {costThresholdMet ? '✓' : '✗'}
              </span>
            </div>
            <div className="h-6 w-px bg-[#2D3748]"></div>
            <div className="flex items-center">
              <span className="text-white mr-2">
                Confidence: {Math.round(aiAssessment.cost_estimate.confidence * 100)}%
              </span>
              <span className={`font-bold text-lg ${confidenceThresholdMet ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                {confidenceThresholdMet ? '✓' : '✗'}
              </span>
            </div>
          </div>
          <p className="text-xs text-[#718096] mt-3">
            Claims below both thresholds can be auto-approved
          </p>
        </div>
      </div>
      <div className="bg-[#1A1F26] border border-[#2D3748] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[28px] font-bold text-white">AI Assessment Complete</h2>
            <p className="text-[#A0AEC0] text-sm mt-1">Processed in {aiAssessment.processing_time}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#718096]">Analysis based on</p>
            <p className="text-lg font-semibold text-[#8B5CF6]">
              {aiAssessment.similar_claims_analyzed.toLocaleString()} similar claims
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-6">
        <h3 className="text-sm font-semibold text-[#8B5CF6] mb-4">Decision Matrix</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className={`border-2 rounded-lg p-4 transition-all ${
            isAutoApprove
              ? 'border-[#10B981] bg-[#10B981]/20'
              : 'border-[#2D3748] bg-[#0F1419]/30'
          }`}>
            <div className="text-center">
              <p className="text-xs text-[#A0AEC0] mb-1">High Confidence + Low Cost</p>
              <p className={`text-sm font-bold ${isAutoApprove ? 'text-[#10B981]' : 'text-white'}`}>
                AUTO-APPROVE {isAutoApprove && '✓'}
              </p>
              {isAutoApprove && <p className="text-xs text-[#10B981] mt-1">(Current Path)</p>}
            </div>
          </div>
          <div className={`border-2 rounded-lg p-4 transition-all ${
            isDirectEscalation
              ? 'border-[#F59E0B] bg-[#F59E0B]/20'
              : 'border-[#2D3748] bg-[#0F1419]/30'
          }`}>
            <div className="text-center">
              <p className="text-xs text-[#A0AEC0] mb-1">High Confidence + High Cost</p>
              <p className={`text-sm font-bold ${isDirectEscalation ? 'text-[#F59E0B]' : 'text-white'}`}>
                ESCALATE {isDirectEscalation && '→'}
              </p>
              {isDirectEscalation && <p className="text-xs text-[#F59E0B] mt-1">(Current Path)</p>}
            </div>
          </div>
          <div className={`border-2 rounded-lg p-4 transition-all ${
            isAgentReassessment
              ? 'border-[#F59E0B] bg-[#F59E0B]/20'
              : 'border-[#2D3748] bg-[#0F1419]/30'
          }`}>
            <div className="text-center">
              <p className="text-xs text-[#A0AEC0] mb-1">Low Confidence + Low Cost</p>
              <p className={`text-sm font-bold ${isAgentReassessment ? 'text-[#F59E0B]' : 'text-white'}`}>
                AGENT REVIEW {isAgentReassessment && '⚠'}
              </p>
              {isAgentReassessment && <p className="text-xs text-[#F59E0B] mt-1">(Current Path)</p>}
            </div>
          </div>
          <div className="border-2 border-[#2D3748] bg-[#0F1419]/30 rounded-lg p-4 opacity-50">
            <div className="text-center">
              <p className="text-xs text-[#A0AEC0] mb-1">Low Confidence + High Cost</p>
              <p className="text-sm font-bold text-white">REVIEW + ESC ⚠⚠</p>
              <p className="text-xs text-[#718096] mt-1">(Not in MVP)</p>
            </div>
          </div>
        </div>
        <div className="text-xs text-center text-[#A0AEC0]">
          Thresholds: Cost = $2,000 | Confidence = 90%
        </div>
      </div>

      <div className="bg-[#1A1F26] border border-[#2D3748] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-8">
        <h3 className="text-xl font-semibold text-white mb-6">Damage Detections</h3>
        <div className="grid grid-cols-2 gap-4">
          {aiAssessment.damage_detections.map((damage: any) => {
            const severityColors = getSeverityColor(damage.severity);
            const confidenceDisplay = getConfidenceDisplay(damage.confidence);
            const needsReview = damage.needs_review;
            const currentAdjustment = damageAdjustments[damage.id] || { severity: damage.severity, cost: damage.estimated_cost };

            return (
              <div
                key={damage.id}
                className={`bg-[#1A1F26] border-2 rounded-xl p-5 transition-all duration-200 ${
                  needsReview
                    ? 'border-[#F59E0B] bg-[#F59E0B]/5'
                    : confirmedDamages.includes(damage.id)
                    ? 'border-[#8B5CF6] shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                    : 'border-[#2D3748] hover:border-[#8B5CF6]'
                } ${!needsReview && 'hover:-translate-y-0.5 cursor-pointer'}`}
                onClick={() => !needsReview && toggleDamage(damage.id)}
              >
                {needsReview && (
                  <div className="mb-3 flex items-center text-xs font-semibold text-[#F59E0B] bg-[#F59E0B]/20 px-3 py-1.5 rounded-lg">
                    <AlertTriangle className="w-3 h-3 mr-1.5" />
                    Low Confidence - Review Needed
                  </div>
                )}
                <div className="flex items-start">
                  {!needsReview && (
                    <input
                      type="checkbox"
                      checked={confirmedDamages.includes(damage.id)}
                      onChange={() => toggleDamage(damage.id)}
                      className="w-5 h-5 mt-1 accent-[#8B5CF6] cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                  <div className={`${!needsReview && 'ml-4'} flex-1`}>
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-white text-base">
                        {damage.location} - {damage.damage_type}
                      </h4>
                    </div>

                    {needsReview && isAgentReassessment ? (
                      <div className="space-y-3 mb-3">
                        <div>
                          <label className="block text-xs text-[#A0AEC0] mb-1">Severity</label>
                          <select
                            value={currentAdjustment.severity}
                            onChange={(e) => handleDamageAdjustment(damage.id, 'severity', e.target.value)}
                            className="w-full px-3 py-2 bg-[#252B36] border border-[#F59E0B] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="Minor">Minor</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Severe">Severe</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-[#A0AEC0] mb-1">Estimated Cost</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0AEC0] text-sm">$</span>
                            <input
                              type="number"
                              value={currentAdjustment.cost}
                              onChange={(e) => handleDamageAdjustment(damage.id, 'cost', e.target.value)}
                              className="w-full pl-8 pr-3 py-2 bg-[#252B36] border border-[#F59E0B] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-right mb-3">
                        <p className="text-xs text-[#718096]">Estimated Cost</p>
                        <p className="text-2xl font-bold text-white">{formatCurrency(damage.estimated_cost)}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${severityColors.bg} ${severityColors.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${severityColors.dot}`}></span>
                        {needsReview ? currentAdjustment.severity : damage.severity}
                      </span>
                      <span className={`text-sm font-medium flex items-center gap-1.5 ${confidenceDisplay.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${confidenceDisplay.dot}`}></span>
                        {Math.round(damage.confidence * 100)}% confidence
                      </span>
                    </div>
                    {needsReview && damage.review_reason && (
                      <div className="flex items-center mt-2 text-[#F59E0B] text-xs">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {damage.review_reason}
                      </div>
                    )}

                    {/* Agent Notes Section - Available for ALL scenarios and ALL items */}
                    <div className="mt-4 pt-4 border-t border-[#2D3748]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleNoteExpansion(damage.id);
                        }}
                        className={`w-full p-3 rounded-lg border transition-all ${
                          expandedNotes[damage.id]
                            ? 'bg-[#F3F4F6] border-[#8B5CF6] hover:bg-[#E5E7EB]'
                            : 'bg-[#F3F4F6] border-[#D1D5DB] hover:bg-[#E5E7EB]'
                        } cursor-pointer flex items-center justify-between`}
                      >
                        <div className="flex items-center">
                          {expandedNotes[damage.id] ? (
                            <Minus className={`w-4 h-4 mr-2 ${expandedNotes[damage.id] ? 'text-[#8B5CF6]' : 'text-[#6B7280]'}`} />
                          ) : (
                            <Plus className={`w-4 h-4 mr-2 ${expandedNotes[damage.id] ? 'text-[#8B5CF6]' : 'text-[#6B7280]'}`} />
                          )}
                          <span className={`text-sm font-medium ${expandedNotes[damage.id] ? 'text-[#8B5CF6]' : 'text-[#6B7280]'}`}>
                            Agent Notes (Optional)
                          </span>
                        </div>
                      </button>

                      {expandedNotes[damage.id] && (
                        <div className="mt-3 p-4 bg-[#F3F4F6] border border-[#8B5CF6] rounded-lg" onClick={(e) => e.stopPropagation()}>
                          <p className="text-sm font-semibold text-[#1F2937] mb-2">
                            Add your observations or context:
                          </p>
                          <textarea
                            value={damageNotes[damage.id] || ''}
                            onChange={(e) => handleNoteChange(damage.id, e.target.value.slice(0, 300))}
                            rows={3}
                            maxLength={300}
                            className="w-full px-3 py-2 bg-white border border-[#D1D5DB] rounded-lg text-[#1F2937] text-sm placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all resize-y"
                            placeholder="Add observations, context, or feedback about this damage..."
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-[#6B7280]">
                              {(damageNotes[damage.id] || '').length}/300 characters
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

                          {showNoteSaved[damage.id] && (
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
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#8B5CF6]/20 to-[#6366F1]/20 border-2 border-[#8B5CF6] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-8">
        <h3 className="text-xl font-semibold text-white mb-6">
          {isAgentReassessment ? 'Total Cost (Updates as you adjust)' : 'Estimated Total Repair Cost'}
        </h3>
        {isAgentReassessment ? (
          <div className="text-center">
            <p className="text-sm text-[#A0AEC0] mb-2">Current Total</p>
            <p className="text-5xl font-bold text-white mb-4">{formatCurrency(currentTotal)}</p>
            {totalExceedsThreshold && (
              <div className="bg-[#F59E0B]/20 border border-[#F59E0B] rounded-lg p-3 text-sm text-[#F59E0B]">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Total now exceeds threshold - escalation required
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-[#A0AEC0] mb-2">Minimum</p>
              <p className="text-lg font-semibold text-white">
                {formatCurrency(aiAssessment.cost_estimate.min)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#A0AEC0] mb-2">Most Likely</p>
              <p className="text-4xl font-bold text-white">
                {formatCurrency(aiAssessment.cost_estimate.most_likely)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#A0AEC0] mb-2">Maximum</p>
              <p className="text-lg font-semibold text-white">
                {formatCurrency(aiAssessment.cost_estimate.max)}
              </p>
            </div>
          </div>
        )}
        {!isAgentReassessment && (
          <div className="flex items-center justify-center text-sm text-[#A0AEC0]">
            <Info className="w-4 h-4 mr-2" />
            Overall Confidence: {Math.round(aiAssessment.cost_estimate.confidence * 100)}%
          </div>
        )}
      </div>

      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-6">
        <div className="flex items-start">
          <Lightbulb className="w-5 h-5 text-[#3B82F6] mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-[#1E3A8A] mb-2">Why this confidence level?</h4>
            <p className="text-sm text-[#1E40AF] italic leading-relaxed">
              {getConfidenceExplanation()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1F26] border border-[#2D3748] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-8">
        <h3 className="text-xl font-semibold text-white mb-6">Detailed Repair Estimate</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2D3748]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#A0AEC0]">Item</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-[#A0AEC0]">Parts</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-[#A0AEC0]">Labor</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-[#A0AEC0]">Hours</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-[#A0AEC0]">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {aiAssessment.damage_detections.map((damage: any, index: number) => {
                const adjustedDamage = damageAdjustments[damage.id] || { severity: damage.severity, cost: damage.estimated_cost };
                return (
                  <tr key={damage.id} className="border-b border-[#2D3748]/50">
                    <td className="py-4 px-4">
                      <div className="text-white font-medium text-sm">{damage.location} - {damage.damage_type}</div>
                      <div className="text-[#718096] text-xs mt-1">{damage.labor_description}</div>
                    </td>
                    <td className="text-right py-4 px-4 text-white text-sm">{formatCurrency(damage.parts_cost)}</td>
                    <td className="text-right py-4 px-4 text-white text-sm">{formatCurrency(damage.labor_cost)}</td>
                    <td className="text-right py-4 px-4 text-white text-sm">{damage.hours}h</td>
                    <td className="text-right py-4 px-4 text-white font-semibold text-sm">
                      {isAgentReassessment && damage.needs_review
                        ? formatCurrency(adjustedDamage.cost)
                        : formatCurrency(damage.estimated_cost)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-[#8B5CF6]/10 border-t-2 border-[#8B5CF6]">
                <td className="py-4 px-4 text-white font-bold text-sm">TOTALS</td>
                <td className="text-right py-4 px-4 text-white font-semibold text-sm">
                  {formatCurrency(aiAssessment.repair_estimate.total_parts)}
                </td>
                <td className="text-right py-4 px-4 text-white font-semibold text-sm">
                  {formatCurrency(aiAssessment.repair_estimate.total_labor)}
                </td>
                <td className="text-right py-4 px-4 text-white font-semibold text-sm">
                  {aiAssessment.repair_estimate.total_hours}h
                </td>
                <td className="text-right py-4 px-4">
                  <div className="text-[#8B5CF6] font-bold text-2xl">
                    {isAgentReassessment ? formatCurrency(currentTotal) : formatCurrency(aiAssessment.cost_estimate.most_likely)}
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <div className="text-right">
            <p className="text-xs text-[#A0AEC0]">Estimated Repair Time</p>
            <p className="text-lg font-semibold text-white">{aiAssessment.repair_estimate.estimated_repair_days} business days</p>
          </div>
        </div>
      </div>

      {isAgentReassessment && currentTotal !== aiAssessment.cost_estimate.most_likely && (
        <div className={`border-2 rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-6 ${
          totalExceedsThreshold
            ? 'bg-[#FEF3C7] border-[#F59E0B]'
            : 'bg-[#D1FAE5] border-[#10B981]'
        }`}>
          <h4 className={`text-lg font-bold mb-4 ${
            totalExceedsThreshold ? 'text-[#92400E]' : 'text-[#065F46]'
          }`}>
            Updated Total Cost
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#4B5563]">Original AI Estimate:</span>
              <span className="text-lg font-semibold text-[#6B7280]">
                {formatCurrency(aiAssessment.cost_estimate.most_likely)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#1F2937]">Your Adjusted Estimate:</span>
              <span className={`text-2xl font-bold ${
                totalExceedsThreshold ? 'text-[#F59E0B]' : 'text-[#10B981]'
              }`}>
                {formatCurrency(currentTotal)}
                {' '}
                <span className="text-lg">
                  ({currentTotal > aiAssessment.cost_estimate.most_likely ? '+' : ''}
                  {formatCurrency(currentTotal - aiAssessment.cost_estimate.most_likely)})
                </span>
              </span>
            </div>
          </div>
          <div className={`mt-4 p-4 rounded-lg ${
            totalExceedsThreshold
              ? 'bg-[#FEF9E6] border border-[#F59E0B]'
              : 'bg-[#ECFDF5] border border-[#10B981]'
          }`}>
            {totalExceedsThreshold ? (
              <p className="text-sm font-semibold text-[#92400E] flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                ⚠️ Total now exceeds $2,000 threshold → This claim will require senior adjuster approval
              </p>
            ) : (
              <p className="text-sm font-semibold text-[#065F46] flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                ✓ Total stays below $2,000 threshold → You can approve this claim
              </p>
            )}
          </div>
        </div>
      )}

      {(isAgentReassessment && totalExceedsThreshold) && (
        <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-8">
          <div className="flex items-start mb-6">
            <Shield className="w-8 h-8 text-[#F59E0B] mr-3 flex-shrink-0" />
            <h3 className="text-2xl font-bold text-[#92400E]">Information for Senior Adjuster</h3>
          </div>
          <div className="h-px bg-[#F59E0B]/30 mb-6"></div>

          {isAgentReassessment && totalExceedsThreshold && (
            <>
              <div className="mb-6">
                <h4 className="text-sm font-bold text-[#92400E] mb-2">ESCALATION REASON:</h4>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Agent adjusted severity assessment from AI's initial estimate, which increased total cost from {formatCurrency(aiAssessment.cost_estimate.most_likely)} to {formatCurrency(currentTotal)} (now exceeds $2,000 threshold). Agent expertise applied.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-[#92400E] mb-2">AGENT'S ASSESSMENT:</h4>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Agent reviewed rear bumper damage and determined severity is MODERATE (not MINOR as AI initially assessed). Agent note: "Based on image angle and damage depth, this requires full bumper repair, not just touch-up."
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-[#92400E] mb-3">AI vs AGENT COMPARISON:</h4>
                <ul className="space-y-2 text-sm text-[#78350F]">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>AI initial estimate: {formatCurrency(aiAssessment.cost_estimate.most_likely)} (68% confidence on bumper item)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Agent adjusted estimate: {formatCurrency(currentTotal)} (agent expertise applied)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Difference: +{formatCurrency(currentTotal - aiAssessment.cost_estimate.most_likely)} (agent correction reasonable and within expected range)</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-[#92400E] mb-3">RECOMMENDED NEXT STEPS:</h4>
                <ol className="space-y-2 text-sm text-[#78350F]">
                  <li className="flex items-start">
                    <span className="mr-2 font-semibold">1.</span>
                    <span>Review agent's severity assessment (likely accurate based on agent's experience)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 font-semibold">2.</span>
                    <span>Consider approving at {formatCurrency(currentTotal)} or request additional image angles for verification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 font-semibold">3.</span>
                    <span>Agent feedback will improve AI accuracy for similar cases</span>
                  </li>
                </ol>
              </div>
            </>
          )}
        </div>
      )}

      {isAutoApprove && (
        <div className="bg-gradient-to-br from-[#10B981]/20 to-[#059669]/10 border-2 border-[#10B981] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-8">
          <div className="flex items-start mb-6">
            <div className="w-12 h-12 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0 mr-4">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#10B981] mb-1">Eligible for Auto-Approval</h3>
              <p className="text-sm text-[#A0AEC0] mb-3">{aiAssessment.decision_path}</p>
              <p className="text-white text-sm leading-relaxed">
                {aiAssessment.approval_analysis.reasoning}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#0F1419]/30 rounded-lg p-4 flex items-center">
              <CheckCircle2 className="w-6 h-6 text-[#10B981] mr-3 flex-shrink-0" />
              <div>
                <p className="text-xs text-[#A0AEC0]">Cost Threshold</p>
                <p className="text-sm font-semibold text-white">
                  {formatCurrency(aiAssessment.approval_analysis.cost_check.actual)} &lt; $2,000 ✓
                </p>
              </div>
            </div>
            <div className="bg-[#0F1419]/30 rounded-lg p-4 flex items-center">
              <CheckCircle2 className="w-6 h-6 text-[#10B981] mr-3 flex-shrink-0" />
              <div>
                <p className="text-xs text-[#A0AEC0]">AI Confidence</p>
                <p className="text-sm font-semibold text-white">
                  All detections ≥ 90% ✓
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-[#10B981]">
              <Clock className="w-4 h-4 mr-2" />
              <span className="font-semibold">Estimated Approval Time: {aiAssessment.approval_analysis.estimated_approval_time}</span>
            </div>
            <div className="text-[#A0AEC0]">
              <span className="font-semibold">{aiAssessment.approval_analysis.processing_time}</span> vs <span className="line-through">24-48 hours</span>
            </div>
          </div>
        </div>
      )}

      {isDirectEscalation && (
        <div className="bg-[#E5E7EB] border-2 border-[#9CA3AF] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-8">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">📋</span>
            <h3 className="text-2xl font-bold text-[#1F2937]">Escalation Required and Guidelines for Senior Adjuster</h3>
          </div>
          <div className="h-px bg-[#9CA3AF] mb-6"></div>

          {/* 1. ESCALATION REASON */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-[#1F2937] uppercase tracking-wide mb-2">Escalation Reason</h4>
            <p className="text-sm text-[#374151] leading-relaxed">
              Total repair cost ({formatCurrency(aiAssessment.approval_analysis.cost_check.actual)}) exceeds $2,000 auto-approval threshold. Per company policy, all claims over $2,000 require senior adjuster authorization.
            </p>
          </div>

          <div className="h-px bg-[#9CA3AF] mb-6"></div>

          {/* 2. AI DAMAGE ASSESSMENT */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-[#1F2937] uppercase tracking-wide mb-3">AI Damage Assessment</h4>

            <div className="mb-4 p-4 bg-white border border-[#D1D5DB] rounded-lg">
              <p className="text-sm font-semibold text-[#1F2937] mb-2">
                Overall Confidence: <span className="text-[#10B981]">{Math.round(aiAssessment.cost_estimate.confidence * 100)}% (HIGH - No re-assessment needed)</span>
              </p>

              <div className="mt-3 pt-3 border-t border-[#D1D5DB]">
                <p className="text-xs font-semibold text-[#6B7280] mb-1">Why this confidence level?</p>
                <p className="text-sm text-[#374151] leading-relaxed">
                  {Math.round(aiAssessment.cost_estimate.confidence * 100)}% confidence because structural damage to the front bumper is clearly identified and matches patterns from {aiAssessment.similar_claims_analyzed} similar high-impact collisions. Cost estimate is based on {aiAssessment.approval_analysis.senior_adjuster_support.similar_approved_claims} comparable structural repairs with similar damage severity (avg: $4,200).
                </p>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm font-semibold text-[#1F2937] mb-2">Detected Damage:</p>
              <ul className="space-y-2">
                {aiAssessment.damage_detections.map((damage: any) => (
                  <li key={damage.id} className="text-sm text-[#374151] ml-4">
                    • <span className="font-medium">{damage.location}</span> - {damage.damage_type} ({damage.severity}, {Math.round(damage.confidence * 100)}% confidence) - {formatCurrency(damage.estimated_cost)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg">
              <p className="text-sm font-semibold text-[#1F2937]">
                Total Estimate: <span className="text-[#8B5CF6]">{formatCurrency(aiAssessment.cost_estimate.most_likely)}</span>
              </p>
              <p className="text-xs text-[#6B7280] mt-1">
                Parts: {formatCurrency(aiAssessment.repair_estimate.total_parts)} | Labor: {formatCurrency(aiAssessment.repair_estimate.total_labor)} | Repair Time: {aiAssessment.repair_estimate.estimated_repair_days} days
              </p>
            </div>
          </div>

          <div className="h-px bg-[#9CA3AF] mb-6"></div>

          {/* 3. RISK & VALIDATION */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-[#1F2937] uppercase tracking-wide mb-3">Risk & Validation</h4>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-[#1F2937] mb-1">
                  Fraud Risk: <span className="text-[#10B981]">{Math.round(aiAssessment.approval_analysis.senior_adjuster_support.fraud_probability * 100)}% (Low)</span>
                </p>
                <ul className="text-xs text-[#6B7280] ml-4 space-y-1">
                  <li>• No duplicate images detected</li>
                  <li>• Damage pattern consistent with reported incident</li>
                  <li>• No inconsistencies in claim details</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#1F2937] mb-1">Policyholder History:</p>
                <ul className="text-xs text-[#6B7280] ml-4 space-y-1">
                  <li>• Last claim: 3 years ago</li>
                  <li>• Claims history: Clean record</li>
                  <li>• Policy status: Active, in good standing</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#1F2937] mb-1">Cost Validation:</p>
                <ul className="text-xs text-[#6B7280] ml-4 space-y-1">
                  <li>• {aiAssessment.approval_analysis.senior_adjuster_support.similar_approved_claims} similar structural repairs averaging $4,200</li>
                  <li>• This estimate: {formatCurrency(aiAssessment.cost_estimate.most_likely)} (+10.7% variance)</li>
                  <li>• Variance within acceptable range (±15%)</li>
                  <li>• No cost outliers detected</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#9CA3AF] mb-6"></div>

          {/* 4. AI RECOMMENDATION */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-[#1F2937] uppercase tracking-wide mb-3">AI Recommendation</h4>

            <div className="p-4 bg-[#D1FAE5] border-2 border-[#10B981] rounded-lg mb-3">
              <p className="text-sm font-bold text-[#065F46] flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                ✓ APPROVE with in-person shop inspection before work begins
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#1F2937] mb-2">Reasoning:</p>
              <ul className="text-sm text-[#374151] ml-4 space-y-1">
                <li>• Structural damage clearly identified ({Math.round(aiAssessment.cost_estimate.confidence * 100)}% confidence)</li>
                <li>• Cost estimate validated against comparable repairs</li>
                <li>• Low fraud risk ({Math.round(aiAssessment.approval_analysis.senior_adjuster_support.fraud_probability * 100)}%)</li>
                <li>• Policyholder has clean claims history</li>
                <li>• Requires certified structural repair shop</li>
                <li>• In-person inspection recommended to verify full extent of structural damage before final authorization</li>
              </ul>
            </div>
          </div>

          <div className="h-px bg-[#9CA3AF] mb-6"></div>

          {/* 5. RECOMMENDED NEXT STEPS */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-[#1F2937] uppercase tracking-wide mb-3">Recommended Next Steps</h4>

            <div className="mb-4">
              <p className="text-sm font-semibold text-[#1F2937] mb-2">For Senior Adjuster:</p>
              <ol className="text-sm text-[#374151] space-y-2">
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-[#8B5CF6]">1.</span>
                  <span>Review AI damage assessment and cost breakdown above</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-[#8B5CF6]">2.</span>
                  <div>
                    <span>Verify recommended shops have structural certification:</span>
                    <ul className="ml-4 mt-1 text-xs text-[#6B7280]">
                      <li>• Bay Area Collision Center (certified)</li>
                      <li>• Golden Gate Auto Body (certified)</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-[#8B5CF6]">3.</span>
                  <span>Approve repair with condition: Certified shop must conduct in-person inspection and confirm structural damage extent before beginning work</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-[#8B5CF6]">4.</span>
                  <span>Provide final authorization after shop confirms no additional structural damage discovered</span>
                </li>
              </ol>
            </div>

            <div className="p-3 bg-[#FEF3C7] border border-[#F59E0B] rounded-lg">
              <p className="text-xs text-[#92400E]">
                <span className="font-semibold">Estimated Review Time: 10-15 minutes</span><br/>
                (AI completed damage assessment - senior adjuster focuses on authorization decision)
              </p>
            </div>
          </div>

          <div className="h-px bg-[#9CA3AF] mb-6"></div>

          {/* 6. AGENT SECTION */}
          <div>
            <h4 className="text-sm font-bold text-[#1F2937] mb-3">Agent Notes (Optional - Add context for senior adjuster):</h4>
            <textarea
              value={localNotes}
              onChange={(e) => setLocalNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-white border-2 border-[#D1D5DB] rounded-lg text-[#1F2937] text-sm placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all"
              placeholder='Example: "Policyholder mentioned previous minor repair to same bumper 6 months ago. No pre-existing damage visible in current images."'
            />

            <div className="mt-4 space-y-3">
              <label className="flex items-start text-sm text-[#374151] cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 mr-3 accent-[#8B5CF6] cursor-pointer"
                />
                <span>☐ I have reviewed the AI assessment and it appears accurate</span>
              </label>
              <label className="flex items-start text-sm text-[#374151] cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 mr-3 accent-[#8B5CF6] cursor-pointer"
                />
                <span>☐ I have verified recommended shops have structural certification</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {isAgentReassessment && (
        <div className="bg-gradient-to-br from-[#F59E0B]/20 to-[#F59E0B]/10 border-2 border-[#F59E0B] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-8">
          <div className="flex items-start mb-6">
            <div className="w-12 h-12 rounded-full bg-[#F59E0B] flex items-center justify-center flex-shrink-0 mr-4">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#F59E0B] mb-1">Low Confidence - Agent Review Recommended</h3>
              <p className="text-sm text-[#A0AEC0] mb-3">{aiAssessment.decision_path}</p>
              <p className="text-white text-sm leading-relaxed">
                {aiAssessment.approval_analysis.reasoning}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#0F1419]/30 rounded-lg p-4 flex items-center">
              <CheckCircle2 className="w-6 h-6 text-[#10B981] mr-3 flex-shrink-0" />
              <div>
                <p className="text-xs text-[#A0AEC0]">Cost Threshold</p>
                <p className="text-sm font-semibold text-white">
                  {formatCurrency(aiAssessment.approval_analysis.cost_check.actual)} &lt; $2,000 ✓
                </p>
              </div>
            </div>
            <div className="bg-[#0F1419]/30 rounded-lg p-4 flex items-center">
              <AlertTriangle className="w-6 h-6 text-[#F59E0B] mr-3 flex-shrink-0" />
              <div>
                <p className="text-xs text-[#A0AEC0]">AI Confidence</p>
                <p className="text-sm font-semibold text-white">
                  Lowest: {Math.round(aiAssessment.approval_analysis.confidence_check.lowest * 100)}% ✗
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F59E0B]/20 border border-[#F59E0B] rounded-lg p-5 mb-6">
            <h4 className="text-sm font-semibold text-white mb-3">Instructions:</h4>
            <p className="text-sm text-white leading-relaxed">
              {aiAssessment.approval_analysis.agent_instructions}
            </p>
          </div>

          <div className="bg-[#10B981]/10 border border-[#10B981] rounded-lg p-4 flex items-start">
            <TrendingUp className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-white">
              <span className="font-semibold text-[#10B981]">✓</span> {aiAssessment.approval_analysis.feedback_message}
            </p>
          </div>

          <div className="flex items-center text-sm text-[#F59E0B] mt-6">
            <Clock className="w-4 h-4 mr-2" />
            <span className="font-semibold">Estimated Approval Time: {aiAssessment.approval_analysis.estimated_approval_time}</span>
          </div>
        </div>
      )}

      <div className="bg-[#1A1F26] border border-[#2D3748] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-8">
        <div className="flex items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Agent Notes & Communication</h3>
          <span className="ml-2 px-2 py-1 bg-[#EF4444] text-white text-xs font-bold rounded">REQUIRED</span>
        </div>

        <AgentNotesSection
          scenario={aiAssessment.recommendation}
          localNotes={localNotes}
          setLocalNotes={setLocalNotes}
          currentTotal={currentTotal}
          formatCurrency={formatCurrency}
        />

        <div className="flex gap-4 mt-8">
          {isAutoApprove && (
            <>
              <button
                onClick={() => handleDecision('approved')}
                className="flex-1 px-8 py-4 bg-[#10B981] text-white font-semibold rounded-lg hover:bg-[#059669] transition-all duration-200 hover:-translate-y-0.5 focus:ring-4 focus:ring-[#10B981]/30"
              >
                Approve Claim
              </button>
              <p className="text-xs text-[#A0AEC0] self-center">No senior adjuster review needed</p>
            </>
          )}

          {isDirectEscalation && (
            <>
              <button
                onClick={() => handleDecision('escalated')}
                className="flex-1 px-8 py-4 bg-[#F59E0B] text-white font-semibold rounded-lg hover:bg-[#D97706] transition-all duration-200 hover:-translate-y-0.5 focus:ring-4 focus:ring-[#F59E0B]/30"
              >
                Escalate to Senior Adjuster
              </button>
              <p className="text-xs text-[#A0AEC0] self-center">AI assessment included for senior review</p>
            </>
          )}

          {isAgentReassessment && (
            <div className="flex-1 flex gap-4">
              {!totalExceedsThreshold ? (
                <button
                  onClick={() => handleDecision('approved')}
                  className="flex-1 px-8 py-4 bg-[#10B981] text-white font-semibold rounded-lg hover:bg-[#059669] transition-all duration-200 hover:-translate-y-0.5 focus:ring-4 focus:ring-[#10B981]/30"
                >
                  Approve Claim
                </button>
              ) : (
                <button
                  onClick={() => handleDecision('escalated')}
                  className="flex-1 px-8 py-4 bg-[#F59E0B] text-white font-semibold rounded-lg hover:bg-[#D97706] transition-all duration-200 hover:-translate-y-0.5 focus:ring-4 focus:ring-[#F59E0B]/30"
                >
                  Escalate to Senior Adjuster
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
