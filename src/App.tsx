import { useState } from 'react';
import { CheckCircle2, Clock, Timer, Zap, Lightbulb } from 'lucide-react';
import ClaimForm from './components/ClaimForm';
import ImageUpload from './components/ImageUpload';
import DamageAssessment from './components/DamageAssessment';
import ConfirmationScreen from './components/ConfirmationScreen';
import ProgressIndicator from './components/ProgressIndicator';
import FeedbackMetrics from './components/FeedbackMetrics';

interface ClaimData {
  claimId: string;
  policyNumber: string;
  policyholderName: string;
  zipCode: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  incidentDate: string;
  uploadedImage: File | null;
  imagePreview: string | null;
  aiAssessment: any;
  confirmedDamages: number[];
  agentNotes: string;
  adjustedCost: number | null;
  finalDecision: string;
  currentStep: number;
}

function App() {
  const [claimData, setClaimData] = useState<ClaimData>({
    claimId: '',
    policyNumber: '',
    policyholderName: '',
    zipCode: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    incidentDate: '',
    uploadedImage: null,
    imagePreview: null,
    aiAssessment: null,
    confirmedDamages: [],
    agentNotes: '',
    adjustedCost: null,
    finalDecision: '',
    currentStep: 1
  });

  const updateClaimData = (updates: Partial<ClaimData>) => {
    setClaimData(prev => ({ ...prev, ...updates }));
  };

  const resetClaim = () => {
    setClaimData({
      claimId: '',
      policyNumber: '',
      policyholderName: '',
      zipCode: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      incidentDate: '',
      uploadedImage: null,
      imagePreview: null,
      aiAssessment: null,
      confirmedDamages: [],
      agentNotes: '',
      adjustedCost: null,
      finalDecision: '',
      currentStep: 1
    });
  };

  return (
    <div className="min-h-screen bg-[#0F1419]">
      <header className="bg-[#0F1419] border-b border-[#2D3748]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Scale AI - Claims Assessment</h1>
                <p className="text-xs text-[#718096]">Intelligent vehicle damage analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-xs text-[#718096]">Agent</p>
                <p className="text-sm font-semibold text-white">Sarah Chen</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {claimData.currentStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-[#1A1F26] border-2 border-[#2D3748] rounded-xl p-6 transition-all duration-200 hover:border-[#10B981] cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">12</div>
                  <div className="text-xs text-[#A0AEC0] uppercase tracking-wide">Claims Completed Today</div>
                </div>
                <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
              </div>
              <div className="text-xs text-[#10B981]">+3 from yesterday</div>
            </div>
            <div className="bg-[#1A1F26] border-2 border-[#2D3748] rounded-xl p-6 transition-all duration-200 hover:border-[#8B5CF6] cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">8</div>
                  <div className="text-xs text-[#A0AEC0] uppercase tracking-wide">Claims in Queue</div>
                </div>
                <Clock className="w-6 h-6 text-[#8B5CF6]" />
              </div>
              <div className="text-xs text-[#718096]">Awaiting review</div>
            </div>
            <div className="bg-[#1A1F26] border-2 border-[#2D3748] rounded-xl p-6 transition-all duration-200 hover:border-[#10B981] cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">11 min</div>
                  <div className="text-xs text-[#A0AEC0] uppercase tracking-wide">Avg Processing Time</div>
                </div>
                <Timer className="w-6 h-6 text-[#10B981]" />
              </div>
              <div className="text-xs text-[#10B981]">↓ 87% vs last month</div>
            </div>
            <div className="bg-[#1A1F26] border-2 border-[#2D3748] rounded-xl p-6 transition-all duration-200 hover:border-[#8B5CF6] cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">68%</div>
                  <div className="text-xs text-[#A0AEC0] uppercase tracking-wide">Auto-Approval Rate</div>
                </div>
                <Zap className="w-6 h-6 text-[#8B5CF6]" />
              </div>
              <div className="text-xs text-[#718096]">Based on last 30 days</div>
            </div>
            <div className="bg-gradient-to-br from-[#10B981]/20 to-[#059669]/10 border-2 border-[#10B981] rounded-xl p-6 transition-all duration-200 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-[#10B981] mb-1">3</div>
                  <div className="text-xs text-[#D1FAE5] uppercase tracking-wide font-semibold">Feedback This Week</div>
                </div>
                <Lightbulb className="w-6 h-6 text-[#10B981]" />
              </div>
              <div className="text-xs text-[#D1FAE5]">Improving AI accuracy</div>
            </div>
          </div>
        )}

        {claimData.currentStep === 1 && (
          <FeedbackMetrics />
        )}

        <ProgressIndicator currentStep={claimData.currentStep} />

        <div className="mt-8">
          {claimData.currentStep === 1 && (
            <ClaimForm
              claimData={claimData}
              updateClaimData={updateClaimData}
            />
          )}

          {claimData.currentStep === 2 && (
            <ImageUpload
              claimData={claimData}
              updateClaimData={updateClaimData}
            />
          )}

          {claimData.currentStep === 3 && (
            <DamageAssessment
              claimData={claimData}
              updateClaimData={updateClaimData}
            />
          )}

          {claimData.currentStep === 4 && (
            <ConfirmationScreen
              claimData={claimData}
              resetClaim={resetClaim}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
