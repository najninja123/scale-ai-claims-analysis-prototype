import { useState } from 'react';
import { CheckCircle2, AlertTriangle, MapPin, Phone, Clock, Star, Target, TrendingUp } from 'lucide-react';
import ScenarioSelector from './ScenarioSelector';

interface ConfirmationScreenProps {
  claimData: any;
  resetClaim: () => void;
}

export default function ConfirmationScreen({ claimData, resetClaim }: ConfirmationScreenProps) {
  const [viewScenario, setViewScenario] = useState(claimData.aiAssessment?.recommendation || 'auto_approve');

  const handleScenarioChange = (newScenario: string) => {
    setViewScenario(newScenario);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const renderAutoApproveCompletion = () => (
    <div className="transition-opacity duration-300">
      <style>
        {`
          @keyframes scaleIn {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-scale-in {
            animation: scaleIn 0.5s ease-out;
          }
        `}
      </style>

      <div className="bg-[#1A1F26] border border-[#2D3748] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-12 text-center mb-6">
        <div className="w-24 h-24 rounded-full bg-[#10B981] flex items-center justify-center mx-auto mb-6 animate-scale-in">
          <CheckCircle2 className="w-14 h-14 text-white" />
        </div>

        <h2 className="text-4xl font-bold text-white mb-3">Claim Approved Successfully</h2>

        <div className="bg-[#0F1419]/50 border border-[#2D3748] rounded-xl p-6 mb-8 text-left max-w-2xl mx-auto">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-[#A0AEC0] mb-1">Claim ID</p>
              <p className="text-lg font-bold text-white">CLM-2024-001</p>
            </div>
            <div>
              <p className="text-sm text-[#A0AEC0] mb-1">Authorization Code</p>
              <p className="text-lg font-bold text-[#10B981]">AUTO-20241118-001</p>
            </div>
            <div>
              <p className="text-sm text-[#A0AEC0] mb-1">Approved Amount</p>
              <p className="text-lg font-bold text-white">{formatCurrency(1820)}</p>
            </div>
            <div>
              <p className="text-sm text-[#A0AEC0] mb-1">Processing Time</p>
              <p className="text-lg font-bold text-[#10B981]">8 minutes</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#2D3748]">
            <p className="text-sm text-[#A0AEC0] mb-1">Decision Path</p>
            <p className="text-sm font-semibold text-white">PATH 1 - Auto-Approve (High Confidence + Low Cost)</p>
          </div>
        </div>

        <div className="bg-[#0F1419]/50 border border-[#2D3748] rounded-xl p-8 mb-8 text-left">
          <h3 className="text-xl font-bold text-white mb-6">Next Steps - Completed Automatically</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm">Policyholder notified via email and SMS</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm">Authorization sent to recommended repair shops</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm">Claim logged for senior adjuster post-approval audit (random quality check)</span>
            </div>
          </div>
        </div>

        <div className="bg-[#EFF6FF] border border-[#3B82F6] rounded-xl p-6 mb-8 text-left">
          <h3 className="text-lg font-bold text-[#1E3A8A] mb-4">Policyholder Communication Sent</h3>
          <p className="text-sm text-[#1E40AF] leading-relaxed">
            "Your claim for {formatCurrency(1820)} has been approved! This covers:
          </p>
          <ul className="text-sm text-[#1E40AF] my-3 ml-4 space-y-1">
            <li>• Front Bumper dent repair - $850</li>
            <li>• Passenger Door scratch repair - $520</li>
            <li>• Hood paint touch-up - $450</li>
          </ul>
          <p className="text-sm text-[#1E40AF] leading-relaxed">
            You can schedule repairs at any of our recommended shops. We've sent you detailed estimate breakdown and shop info via email.
          </p>
          <p className="text-sm text-[#1E40AF] leading-relaxed mt-2">
            Estimated repair time: 2 business days"
          </p>
        </div>

        <div className="bg-[#0F1419]/50 border border-[#2D3748] rounded-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <MapPin className="w-6 h-6 text-[#8B5CF6] mr-2" />
            <h3 className="text-xl font-bold text-white">Recommended Repair Shops</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1A1F26] border border-[#2D3748] rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-white">Golden Gate Auto Body</h4>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  <span className="text-white text-sm ml-1">4.8</span>
                </div>
              </div>
              <p className="text-sm text-[#A0AEC0] mb-3">1234 Mission Street, San Francisco, CA 94103</p>
              <div className="flex items-center text-sm text-[#A0AEC0] mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                <span>0.8 mi away</span>
              </div>
              <div className="flex items-center text-sm text-[#A0AEC0] mb-2">
                <Clock className="w-4 h-4 mr-2" />
                <span>2-day wait</span>
              </div>
              <div className="flex items-center text-sm text-[#A0AEC0]">
                <Phone className="w-4 h-4 mr-2" />
                <span>(415) 555-0190</span>
              </div>
            </div>
            <div className="bg-[#1A1F26] border border-[#2D3748] rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-white">Bay Area Collision Center</h4>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  <span className="text-white text-sm ml-1">4.6</span>
                </div>
              </div>
              <p className="text-sm text-[#A0AEC0] mb-3">567 Folsom Street, San Francisco, CA 94105</p>
              <div className="flex items-center text-sm text-[#A0AEC0] mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                <span>1.2 mi away</span>
              </div>
              <div className="flex items-center text-sm text-[#A0AEC0] mb-2">
                <Clock className="w-4 h-4 mr-2" />
                <span>3-day wait</span>
              </div>
              <div className="flex items-center text-sm text-[#A0AEC0]">
                <Phone className="w-4 h-4 mr-2" />
                <span>(415) 555-0191</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F3F4F6] border border-[#9CA3AF] rounded-xl p-6 mb-8 text-left">
          <h3 className="text-lg font-bold text-[#374151] mb-4">Internal Records Saved</h3>
          <div className="space-y-2 text-sm text-[#4B5563]">
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>Decision path: AUTO-APPROVE (high confidence + low cost)</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>AI confidence: 92% (all detections above 90% threshold)</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>Agent review: Completed by Agent Sarah Chen on {new Date().toLocaleString()}</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>Quality flag: None (routine post-approval audit scheduled)</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>Total processing time: 8 minutes (vs 24-48 hrs manual)</span>
            </div>
          </div>
        </div>

        <button
          onClick={resetClaim}
          className="w-full px-8 py-4 bg-[#8B5CF6] text-white font-semibold text-lg rounded-lg hover:bg-[#7C3AED] transition-all duration-200 hover:-translate-y-0.5 focus:ring-4 focus:ring-[#8B5CF6]/30"
        >
          Start New Claim
        </button>
      </div>
    </div>
  );

  const renderDirectEscalationCompletion = () => (
    <div className="transition-opacity duration-300">
      <style>
        {`
          @keyframes scaleIn {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-scale-in {
            animation: scaleIn 0.5s ease-out;
          }
        `}
      </style>

      <div className="bg-[#1A1F26] border border-[#2D3748] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-12 text-center mb-6">
        <div className="w-24 h-24 rounded-full bg-[#F59E0B] flex items-center justify-center mx-auto mb-6 animate-scale-in">
          <AlertTriangle className="w-14 h-14 text-white" />
        </div>

        <h2 className="text-4xl font-bold text-white mb-3">Claim Escalated to Senior Adjuster</h2>

        <div className="bg-[#0F1419]/50 border border-[#2D3748] rounded-xl p-6 mb-8 text-left max-w-2xl mx-auto">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-[#A0AEC0] mb-1">Claim ID</p>
              <p className="text-lg font-bold text-white">CLM-2024-002</p>
            </div>
            <div>
              <p className="text-sm text-[#A0AEC0] mb-1">Expected Decision</p>
              <p className="text-lg font-bold text-[#F59E0B]">24-48 hours</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-[#A0AEC0] mb-1">Escalation Reason</p>
              <p className="text-sm font-semibold text-white">Repair cost ($4,650) exceeds auto-approval threshold</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#2D3748]">
            <p className="text-sm text-[#A0AEC0] mb-1">Decision Path</p>
            <p className="text-sm font-semibold text-white">PATH 3 - Direct Escalation (High Confidence + High Cost)</p>
          </div>
        </div>

        <div className="bg-[#0F1419]/50 border border-[#2D3748] rounded-xl p-8 mb-8 text-left">
          <h3 className="text-xl font-bold text-white mb-6">What Happens Next</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-[#F59E0B] font-bold text-sm">→</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Senior adjuster receives complete AI analysis with all documentation</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-[#F59E0B] font-bold text-sm">→</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">In-person shop inspection may be required before final approval</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-[#F59E0B] font-bold text-sm">→</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Decision made within 24-48 hours</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-[#F59E0B] font-bold text-sm">→</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Policyholder automatically notified of decision</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#FEF3C7] border border-[#F59E0B] rounded-xl p-6 mb-8 text-left">
          <h3 className="text-lg font-bold text-[#92400E] mb-4">Policyholder Communication Sent</h3>
          <p className="text-sm text-[#78350F] leading-relaxed">
            "Your claim for structural damage has been sent to our senior adjuster for final authorization. The repair estimate is {formatCurrency(4650)} and includes:
          </p>
          <ul className="text-sm text-[#78350F] my-3 ml-4 space-y-1">
            <li>• Front bumper structural repair - $2,800</li>
            <li>• Front right fender work - $1,200</li>
            <li>• Hood paint damage - $650</li>
          </ul>
          <p className="text-sm text-[#78350F] leading-relaxed">
            This is standard procedure for repairs over $2,000. You'll hear back within 24-48 hours with a final decision."
          </p>
        </div>

        <div className="bg-[#0F1419]/50 border border-[#2D3748] rounded-xl p-8 mb-8 text-left">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mr-3">
              <span className="text-[#F59E0B] font-bold">📋</span>
            </div>
            Senior Adjuster Receives
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm">Complete AI damage assessment (91% confidence - HIGH)</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm">Itemized repair estimate: {formatCurrency(4650)}</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm">AI recommendation: Approve with in-person shop inspection</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm">Risk level: Medium</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm">Comparison to 23 similar structural repairs (avg: $4,200)</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm">No fraud indicators detected</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm">Policyholder claims history: Last claim 3 years ago</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm">Certified repair shops for structural work</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm">Agent notes: "Policyholder mentioned previous minor repair to same area 6 months ago"</span>
            </div>
          </div>
        </div>

        <div className="bg-[#8B5CF6]/10 border-2 border-[#8B5CF6] rounded-xl p-6 mb-8 text-left">
          <h3 className="text-lg font-bold text-[#8B5CF6] mb-3">AI Confidence Level: HIGH</h3>
          <p className="text-sm text-white leading-relaxed mb-3">
            Senior adjuster review focuses on authorization, not damage verification. AI already completed the assessment work.
          </p>
          <p className="text-sm text-[#A0AEC0] leading-relaxed">
            Estimated senior review time: <span className="font-bold text-[#8B5CF6]">10-15 minutes</span> (75% faster than manual process)
          </p>
        </div>

        <div className="bg-[#0F1419]/50 border border-[#2D3748] rounded-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <MapPin className="w-6 h-6 text-[#8B5CF6] mr-2" />
            <h3 className="text-xl font-bold text-white">Recommended Shops (Structural Certified)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1A1F26] border-2 border-[#F59E0B] rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-white">Bay Area Collision Center</h4>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  <span className="text-white text-sm ml-1">4.6</span>
                </div>
              </div>
              <div className="mb-2 px-2 py-1 bg-[#F59E0B]/20 rounded inline-block">
                <span className="text-xs font-bold text-[#F59E0B]">STRUCTURAL CERTIFIED</span>
              </div>
              <p className="text-sm text-[#A0AEC0] mb-3">567 Folsom Street, San Francisco, CA 94105</p>
              <div className="flex items-center text-sm text-[#A0AEC0] mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                <span>1.8 mi away</span>
              </div>
              <div className="flex items-center text-sm text-[#A0AEC0] mb-2">
                <Clock className="w-4 h-4 mr-2" />
                <span>4-day wait</span>
              </div>
              <div className="flex items-center text-sm text-[#A0AEC0]">
                <Phone className="w-4 h-4 mr-2" />
                <span>(415) 555-0191</span>
              </div>
            </div>
            <div className="bg-[#1A1F26] border-2 border-[#F59E0B] rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-white">Golden Gate Auto Body</h4>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  <span className="text-white text-sm ml-1">4.8</span>
                </div>
              </div>
              <div className="mb-2 px-2 py-1 bg-[#F59E0B]/20 rounded inline-block">
                <span className="text-xs font-bold text-[#F59E0B]">STRUCTURAL CERTIFIED</span>
              </div>
              <p className="text-sm text-[#A0AEC0] mb-3">1234 Mission Street, San Francisco, CA 94103</p>
              <div className="flex items-center text-sm text-[#A0AEC0] mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                <span>2.1 mi away</span>
              </div>
              <div className="flex items-center text-sm text-[#A0AEC0] mb-2">
                <Clock className="w-4 h-4 mr-2" />
                <span>5-day wait</span>
              </div>
              <div className="flex items-center text-sm text-[#A0AEC0]">
                <Phone className="w-4 h-4 mr-2" />
                <span>(415) 555-0190</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F3F4F6] border border-[#9CA3AF] rounded-xl p-6 mb-8 text-left">
          <h3 className="text-lg font-bold text-[#374151] mb-4">Internal Records Saved</h3>
          <div className="space-y-2 text-sm text-[#4B5563]">
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>Decision path: DIRECT ESCALATION (high confidence + high cost)</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>AI assessment: 91% confidence (structural damage clearly identified)</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>Escalation trigger: Cost $4,650 &gt; $2,000 threshold</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>Agent review: AI assessment verified as accurate</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>No re-assessment needed (AI highly confident)</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>Agent: Sarah Chen | Date: {new Date().toLocaleString()}</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>Estimated resolution: 24-48 hours</span>
            </div>
          </div>
        </div>

        <button
          onClick={resetClaim}
          className="w-full px-8 py-4 bg-[#8B5CF6] text-white font-semibold text-lg rounded-lg hover:bg-[#7C3AED] transition-all duration-200 hover:-translate-y-0.5 focus:ring-4 focus:ring-[#8B5CF6]/30"
        >
          Start New Claim
        </button>
      </div>
    </div>
  );

  const renderAgentReassessmentCompletion = () => (
    <div className="transition-opacity duration-300">
      <style>
        {`
          @keyframes scaleIn {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-scale-in {
            animation: scaleIn 0.5s ease-out;
          }
        `}
      </style>

      <div className="bg-[#1A1F26] border border-[#2D3748] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-12 text-center mb-6">
        <div className="w-24 h-24 rounded-full bg-[#F59E0B] flex items-center justify-center mx-auto mb-6 animate-scale-in">
          <AlertTriangle className="w-14 h-14 text-white" />
        </div>

        <h2 className="text-4xl font-bold text-white mb-2">Claim Escalated to Senior Adjuster</h2>
        <p className="text-lg text-[#A0AEC0] mb-6">(After Agent Review)</p>

        <div className="bg-[#0F1419]/50 border border-[#2D3748] rounded-xl p-6 mb-8 text-left max-w-2xl mx-auto">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-[#A0AEC0] mb-1">Claim ID</p>
              <p className="text-lg font-bold text-white">CLM-2024-003</p>
            </div>
            <div>
              <p className="text-sm text-[#A0AEC0] mb-1">Expected Decision</p>
              <p className="text-lg font-bold text-[#F59E0B]">24-48 hours</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-[#A0AEC0] mb-1">Escalation Reason</p>
              <p className="text-sm font-semibold text-white">Cost increased to $2,100 after agent review (exceeds threshold)</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#2D3748]">
            <p className="text-sm text-[#A0AEC0] mb-1">Decision Path</p>
            <p className="text-sm font-semibold text-white">PATH 2 - Agent Re-Assessment → Escalated</p>
          </div>
        </div>

        <div className="bg-[#0F1419]/50 border border-[#2D3748] rounded-xl p-8 mb-8 text-left">
          <h3 className="text-xl font-bold text-white mb-6">What Happens Next</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-[#F59E0B] font-bold text-sm">→</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Senior adjuster receives your complete assessment</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-[#F59E0B] font-bold text-sm">→</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Senior adjuster reviews agent's severity adjustment</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-[#F59E0B] font-bold text-sm">→</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Decision made within 24-48 hours</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-[#F59E0B] font-bold text-sm">→</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Policyholder automatically notified of decision</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#FEF3C7] border border-[#F59E0B] rounded-xl p-6 mb-8 text-left">
          <h3 className="text-lg font-bold text-[#92400E] mb-4">Policyholder Communication Sent</h3>
          <p className="text-sm text-[#78350F] leading-relaxed">
            "Your claim requires additional review due to the repair cost estimate ({formatCurrency(2100)}). Our senior adjuster will review within 24-48 hours.
          </p>
          <p className="text-sm text-[#78350F] leading-relaxed mt-3">
            Your damage assessment is complete - this is just a final authorization step for repairs over $2,000. We'll notify you as soon as it's approved."
          </p>
        </div>

        <div className="bg-[#0F1419]/50 border border-[#2D3748] rounded-xl p-8 mb-8 text-left">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mr-3">
              <span className="text-[#F59E0B] font-bold">📋</span>
            </div>
            Senior Adjuster Receives
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm">Complete AI damage assessment (75% initial confidence)</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-white text-sm">
                <p className="font-semibold mb-1">Your adjusted severity assessment:</p>
                <p className="text-[#A0AEC0]">Rear bumper: Minor → Moderate</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-white text-sm">
                <p className="font-semibold mb-1">Cost comparison:</p>
                <p className="text-[#A0AEC0]">• AI initial estimate: $1,800</p>
                <p className="text-[#A0AEC0]">• Your adjusted estimate: $2,100 (+$300)</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-white text-sm">
                <p className="font-semibold mb-1">Your reasoning:</p>
                <p className="text-[#A0AEC0] italic">"Damage depth requires full bumper repair, not just surface work"</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm">Recommended repair shops (all approved for this work)</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#10B981]/20 to-[#059669]/10 border-2 border-[#10B981] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-8 mb-8 text-left">
          <div className="flex items-center mb-6">
            <Target className="w-8 h-8 text-[#10B981] mr-3" />
            <h3 className="text-2xl font-bold text-[#10B981]">Your Feedback Impact</h3>
          </div>
          <div className="h-px bg-[#10B981]/30 mb-6"></div>

          <div className="bg-[#ECFDF5] border border-[#10B981] rounded-lg p-4 mb-4">
            <p className="text-sm font-bold text-[#065F46] mb-2 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Feedback Captured for AI Improvement
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-bold text-white mb-3">Your corrections on this claim:</h4>
            <ul className="space-y-2 text-sm text-[#A0AEC0]">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Rear Bumper severity: Minor → Moderate</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Cost adjustment: $650 → $950 (+$300)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span className="italic">Reasoning: "Damage depth requires full bumper repair"</span>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-bold text-white mb-3">How this improves the AI:</h4>
            <ul className="space-y-2 text-sm text-[#A0AEC0]">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Training data: High-quality labeled correction</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Damage type: Rear bumper dents at angle</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Estimated improvement: <span className="font-bold text-[#10B981]">15% accuracy gain</span> for similar damage patterns</span>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-bold text-white mb-3">Next Steps:</h4>
            <div className="space-y-2 text-sm text-[#A0AEC0]">
              <p className="flex items-start">
                <span className="mr-2">→</span>
                <span>Your feedback logged and verified</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">→</span>
                <span>Included in quarterly model retraining (Jan 2025)</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">→</span>
                <span>You'll see AI improve on similar cases over time</span>
              </p>
            </div>
          </div>

          <div className="bg-[#D1FAE5] border border-[#10B981] rounded-lg p-4">
            <p className="text-sm text-[#065F46] leading-relaxed">
              <span className="font-bold">Thank you for improving the system!</span> Your expertise helps AI learn patterns it previously missed.
            </p>
          </div>
        </div>

        <div className="bg-[#0F1419]/50 border border-[#2D3748] rounded-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <MapPin className="w-6 h-6 text-[#8B5CF6] mr-2" />
            <h3 className="text-xl font-bold text-white">Recommended Repair Shops</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1A1F26] border border-[#2D3748] rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-white">SF Premium Auto Repair</h4>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  <span className="text-white text-sm ml-1">4.7</span>
                </div>
              </div>
              <p className="text-sm text-[#A0AEC0] mb-3">890 Market Street, San Francisco, CA 94102</p>
              <div className="flex items-center text-sm text-[#A0AEC0] mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                <span>0.6 mi away</span>
              </div>
              <div className="flex items-center text-sm text-[#A0AEC0] mb-2">
                <Clock className="w-4 h-4 mr-2" />
                <span>1-day wait</span>
              </div>
              <div className="flex items-center text-sm text-[#A0AEC0]">
                <Phone className="w-4 h-4 mr-2" />
                <span>(415) 555-0192</span>
              </div>
            </div>
            <div className="bg-[#1A1F26] border border-[#2D3748] rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-white">Golden Gate Auto Body</h4>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  <span className="text-white text-sm ml-1">4.8</span>
                </div>
              </div>
              <p className="text-sm text-[#A0AEC0] mb-3">1234 Mission Street, San Francisco, CA 94103</p>
              <div className="flex items-center text-sm text-[#A0AEC0] mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                <span>1.1 mi away</span>
              </div>
              <div className="flex items-center text-sm text-[#A0AEC0] mb-2">
                <Clock className="w-4 h-4 mr-2" />
                <span>2-day wait</span>
              </div>
              <div className="flex items-center text-sm text-[#A0AEC0]">
                <Phone className="w-4 h-4 mr-2" />
                <span>(415) 555-0190</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F3F4F6] border border-[#9CA3AF] rounded-xl p-6 mb-8 text-left">
          <h3 className="text-lg font-bold text-[#374151] mb-4">Internal Records Saved</h3>
          <div className="space-y-2 text-sm text-[#4B5563]">
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>Decision path: AGENT RE-ASSESSMENT → ESCALATED</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>Original AI assessment: $1,800 (68% confidence on rear bumper)</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>Agent adjusted assessment: $2,100</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>Escalation trigger: Cost exceeded $2,000 threshold after agent adjustment</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>Agent: Sarah Chen | Date: {new Date().toLocaleString()}</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>Agent correction captured for AI training</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span>Estimated resolution: 24-48 hours</span>
            </div>
          </div>
        </div>

        <button
          onClick={resetClaim}
          className="w-full px-8 py-4 bg-[#8B5CF6] text-white font-semibold text-lg rounded-lg hover:bg-[#7C3AED] transition-all duration-200 hover:-translate-y-0.5 focus:ring-4 focus:ring-[#8B5CF6]/30"
        >
          Start New Claim
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <ScenarioSelector
        currentScenario={viewScenario}
        onScenarioChange={handleScenarioChange}
        isCompletionPage={true}
      />

      {viewScenario === 'auto_approve' && renderAutoApproveCompletion()}
      {viewScenario === 'direct_escalation' && renderDirectEscalationCompletion()}
      {viewScenario === 'agent_reassessment' && renderAgentReassessmentCompletion()}
    </div>
  );
}
