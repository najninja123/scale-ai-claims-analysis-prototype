import { useState, useRef, useEffect } from 'react';
import { Upload, FileImage, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  claimData: any;
  updateClaimData: (updates: any) => void;
}

export const scenario1AutoApprove = {
  claim_id: "CLM-2024-001",
  processing_time: "2.3 seconds",
  damage_detections: [
    {
      id: 1,
      location: "Front Bumper",
      damage_type: "Dent",
      severity: "Minor",
      confidence: 0.94,
      estimated_cost: 850,
      needs_review: false,
      parts_cost: 450,
      labor_cost: 400,
      hours: 3,
      labor_description: "Remove and repair bumper dent, refinish"
    },
    {
      id: 2,
      location: "Passenger Door",
      damage_type: "Scratches",
      severity: "Minor",
      confidence: 0.91,
      estimated_cost: 520,
      needs_review: false,
      parts_cost: 180,
      labor_cost: 340,
      hours: 2.5,
      labor_description: "Sand, fill, and repaint door panel"
    },
    {
      id: 3,
      location: "Hood",
      damage_type: "Paint Damage",
      severity: "Minor",
      confidence: 0.92,
      estimated_cost: 450,
      needs_review: false,
      parts_cost: 150,
      labor_cost: 300,
      hours: 2,
      labor_description: "Prep and paint hood panel"
    }
  ],
  repair_estimate: {
    total_parts: 780,
    total_labor: 1040,
    total_hours: 7.5,
    estimated_repair_days: 2
  },
  cost_estimate: {
    min: 1620,
    max: 2020,
    most_likely: 1820,
    confidence: 0.92
  },
  recommendation: "auto_approve",
  decision_path: "PATH 1: Auto-Approve (High Confidence + Low Cost)",
  similar_claims_analyzed: 847,
  approval_analysis: {
    eligible_for_auto_approval: true,
    decision_matrix_position: "high_confidence_low_cost",
    cost_threshold_met: true,
    confidence_threshold_met: true,
    cost_check: {
      actual: 1820,
      threshold: 2000,
      status: "BELOW"
    },
    confidence_check: {
      lowest: 0.91,
      threshold: 0.90,
      status: "ABOVE"
    },
    reasoning: "All damage detections have ≥90% confidence AND total cost is below $2,000 threshold. This claim qualifies for instant approval.",
    estimated_approval_time: "Immediate",
    processing_time: "8 minutes",
    authorization_code: "AUTO-20241118-001"
  },
  recommended_shops: [
    {
      id: 1,
      name: "Golden Gate Auto Body",
      address: "1234 Mission Street",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      rating: 4.8,
      reviews: 342,
      distance: 0.8,
      specialties: ["Collision repair", "Paint & body"],
      wait_days: 2,
      warranty: "Lifetime warranty on repairs",
      phone: "(415) 555-0190",
      is_recommended: true
    },
    {
      id: 2,
      name: "Bay Area Collision Center",
      address: "567 Folsom Street",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      rating: 4.6,
      reviews: 289,
      distance: 1.2,
      specialties: ["Collision repair", "Frame straightening"],
      wait_days: 3,
      warranty: "5-year warranty on paint",
      phone: "(415) 555-0191",
      is_recommended: false
    }
  ]
};

export const scenario2DirectEscalation = {
  claim_id: "CLM-2024-002",
  processing_time: "2.8 seconds",
  damage_detections: [
    {
      id: 1,
      location: "Front Bumper",
      damage_type: "Structural Damage",
      severity: "Severe",
      confidence: 0.91,
      estimated_cost: 2800,
      needs_review: false,
      parts_cost: 1500,
      labor_cost: 1300,
      hours: 8,
      labor_description: "Remove and replace bumper reinforcement, frame straightening"
    },
    {
      id: 2,
      location: "Front Right Fender",
      damage_type: "Dent",
      severity: "Moderate",
      confidence: 0.88,
      estimated_cost: 1200,
      needs_review: false,
      parts_cost: 650,
      labor_cost: 550,
      hours: 4,
      labor_description: "Replace fender panel, blend paint"
    },
    {
      id: 3,
      location: "Hood",
      damage_type: "Paint Damage",
      severity: "Minor",
      confidence: 0.93,
      estimated_cost: 650,
      needs_review: false,
      parts_cost: 200,
      labor_cost: 450,
      hours: 3,
      labor_description: "Sand, prep, and repaint hood"
    }
  ],
  repair_estimate: {
    total_parts: 2350,
    total_labor: 2300,
    total_hours: 15,
    estimated_repair_days: 4
  },
  cost_estimate: {
    min: 4200,
    max: 5100,
    most_likely: 4650,
    confidence: 0.91
  },
  recommendation: "direct_escalation",
  decision_path: "PATH 3: Direct Escalation (High Confidence + High Cost)",
  similar_claims_analyzed: 623,
  approval_analysis: {
    eligible_for_auto_approval: false,
    decision_matrix_position: "high_confidence_high_cost",
    cost_threshold_met: false,
    confidence_threshold_met: true,
    cost_check: {
      actual: 4650,
      threshold: 2000,
      status: "ABOVE"
    },
    confidence_check: {
      lowest: 0.88,
      threshold: 0.90,
      status: "ABOVE",
      note: "All detections close to or above 90%"
    },
    reasoning: "AI assessment is highly confident (91% average), but total cost of $4,650 exceeds the $2,000 auto-approval threshold. Senior adjuster review required for high-cost claims.",
    ai_confidence_note: "AI confidence is high - no agent re-assessment needed. Escalate with AI guidance.",
    estimated_approval_time: "24-48 hours",
    senior_adjuster_support: {
      recommendation: "Approve with possible in-person inspection",
      risk_level: "Medium",
      similar_approved_claims: 23,
      fraud_probability: 0.08,
      suggested_actions: [
        "Review structural damage assessment",
        "Consider in-person inspection for validation",
        "Verify repair cost estimates with approved shops"
      ]
    }
  },
  recommended_shops: [
    {
      id: 1,
      name: "Golden Gate Auto Body",
      address: "1234 Mission Street",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      rating: 4.8,
      reviews: 342,
      distance: 0.8,
      specialties: ["Collision repair", "Frame straightening"],
      wait_days: 5,
      warranty: "Lifetime warranty on structural repairs",
      phone: "(415) 555-0190",
      is_recommended: true
    },
    {
      id: 2,
      name: "Bay Area Collision Center",
      address: "567 Folsom Street",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      rating: 4.6,
      reviews: 289,
      distance: 1.2,
      specialties: ["Collision repair", "Paint & body"],
      wait_days: 4,
      warranty: "5-year warranty on paint",
      phone: "(415) 555-0191",
      is_recommended: false
    }
  ]
};

export const scenario3AgentReassessment = {
  claim_id: "CLM-2024-003",
  processing_time: "2.1 seconds",
  damage_detections: [
    {
      id: 1,
      location: "Rear Bumper",
      damage_type: "Dent",
      severity: "Moderate",
      confidence: 0.68,
      estimated_cost: 950,
      needs_review: true,
      review_reason: "Low confidence (68%) - Please verify severity",
      parts_cost: 520,
      labor_cost: 430,
      hours: 3,
      labor_description: "Repair or replace rear bumper, refinish"
    },
    {
      id: 2,
      location: "Rear Right Quarter Panel",
      damage_type: "Scratches",
      severity: "Minor",
      confidence: 0.82,
      estimated_cost: 520,
      needs_review: false,
      parts_cost: 180,
      labor_cost: 340,
      hours: 2.5,
      labor_description: "Sand, fill, and repaint quarter panel"
    },
    {
      id: 3,
      location: "Tail Light",
      damage_type: "Broken",
      severity: "Minor",
      confidence: 0.76,
      estimated_cost: 480,
      needs_review: false,
      parts_cost: 320,
      labor_cost: 160,
      hours: 1,
      labor_description: "Replace tail light assembly"
    }
  ],
  repair_estimate: {
    total_parts: 1020,
    total_labor: 930,
    total_hours: 6.5,
    estimated_repair_days: 2
  },
  cost_estimate: {
    min: 1750,
    max: 2150,
    most_likely: 1950,
    confidence: 0.75
  },
  recommendation: "agent_reassessment",
  decision_path: "PATH 2: Agent Re-Assessment",
  similar_claims_analyzed: 412,
  approval_analysis: {
    eligible_for_auto_approval: false,
    decision_matrix_position: "low_confidence_low_cost",
    cost_threshold_met: true,
    confidence_threshold_met: false,
    cost_check: {
      actual: 1950,
      threshold: 2000,
      status: "BELOW"
    },
    confidence_check: {
      lowest: 0.68,
      threshold: 0.90,
      status: "BELOW"
    },
    reasoning: "AI detected damage below cost threshold, but confidence is only 75% overall with one item at 68%. Agent review and manual adjustment recommended before approval.",
    low_confidence_items: [
      {
        id: 1,
        location: "Rear Bumper",
        confidence: 0.68,
        message: "Please verify severity"
      }
    ],
    agent_instructions: "Review flagged items carefully. Adjust severity levels and costs as needed. If adjusted total remains below $2,000, you can approve. If adjustments exceed $2,000, escalate to senior adjuster.",
    feedback_message: "Your adjustments will improve AI accuracy for similar damage patterns",
    estimated_approval_time: "15-20 minutes (with your review)"
  },
  recommended_shops: [
    {
      id: 1,
      name: "Golden Gate Auto Body",
      address: "1234 Mission Street",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      rating: 4.8,
      reviews: 342,
      distance: 0.8,
      specialties: ["Collision repair", "Paint & body"],
      wait_days: 2,
      warranty: "Lifetime warranty on repairs",
      phone: "(415) 555-0190",
      is_recommended: true
    },
    {
      id: 2,
      name: "Bay Area Collision Center",
      address: "567 Folsom Street",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      rating: 4.6,
      reviews: 289,
      distance: 1.2,
      specialties: ["Collision repair", "Frame straightening"],
      wait_days: 3,
      warranty: "5-year warranty on paint",
      phone: "(415) 555-0191",
      is_recommended: false
    }
  ]
};

export default function ImageUpload({ claimData, updateClaimData }: ImageUploadProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-trigger analysis when scenario is forced (from switcher)
  useEffect(() => {
    if (claimData.forceScenario && claimData.imagePreview) {
      handleAnalyze();
    }
  }, [claimData.forceScenario]);

  const handleFile = (file: File) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateClaimData({
          uploadedImage: file,
          imagePreview: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      let selectedAssessment;

      // Check if scenario is forced (from scenario switcher)
      if (claimData.forceScenario) {
        const scenarioMap: Record<string, any> = {
          'auto_approve': scenario1AutoApprove,
          'direct_escalation': scenario2DirectEscalation,
          'agent_reassessment': scenario3AgentReassessment
        };
        selectedAssessment = scenarioMap[claimData.forceScenario];
      } else {
        // Random selection as before
        const scenarios = [scenario1AutoApprove, scenario2DirectEscalation, scenario3AgentReassessment];
        const randomIndex = Math.floor(Math.random() * 3);
        selectedAssessment = scenarios[randomIndex];
      }

      const allDamageIds = selectedAssessment.damage_detections.map((d: any) => d.id);
      updateClaimData({
        aiAssessment: selectedAssessment,
        confirmedDamages: allDamageIds,
        currentStep: 3,
        forceScenario: null // Clear the force flag
      });
      setIsAnalyzing(false);
    }, 800); // Reduced to 800ms for faster demo switching
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="bg-[#1A1F26] border border-[#2D3748] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-8">
      <h2 className="text-[28px] font-bold text-white mb-2">Upload Vehicle Damage Image</h2>
      <p className="text-[#A0AEC0] text-sm mb-8">
        Upload a clear photo of the vehicle damage for AI analysis. Accepted formats: JPEG, PNG
      </p>

      {!claimData.imagePreview ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 ${
            dragActive
              ? 'border-[#8B5CF6] bg-[#8B5CF6]/10'
              : 'border-[#2D3748] hover:border-[#8B5CF6]/50'
          }`}
        >
          <Upload className={`w-16 h-16 mx-auto mb-4 transition-colors ${
            dragActive ? 'text-[#8B5CF6]' : 'text-[#718096]'
          }`} />
          <p className="text-lg font-medium text-white mb-2">
            Drag and drop your image here
          </p>
          <p className="text-sm text-[#718096] mb-4">or</p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-[#8B5CF6] text-white font-semibold rounded-lg hover:bg-[#7C3AED] transition-all duration-200 hover:-translate-y-0.5"
          >
            Choose File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleChange}
            className="hidden"
          />
          <p className="text-xs text-[#718096] mt-4">Maximum file size: 10MB</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="border border-[#2D3748] bg-[#252B36] rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <FileImage className="w-10 h-10 text-[#8B5CF6] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {claimData.uploadedImage?.name}
                </p>
                <p className="text-sm text-[#A0AEC0]">
                  {claimData.uploadedImage && formatFileSize(claimData.uploadedImage.size)}
                </p>
              </div>
              <button
                onClick={() => updateClaimData({ uploadedImage: null, imagePreview: null })}
                className="text-sm text-[#EF4444] hover:text-[#DC2626] font-medium transition-colors"
              >
                Remove
              </button>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden border border-[#2D3748]">
            <img
              src={claimData.imagePreview}
              alt="Vehicle damage preview"
              className="w-full h-auto max-h-96 object-contain bg-[#0F1419]"
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => updateClaimData({ currentStep: 1 })}
              className="px-6 py-3 border-2 border-[#8B5CF6] text-[#8B5CF6] font-semibold rounded-lg hover:bg-[#8B5CF6]/10 transition-all duration-200"
            >
              Back
            </button>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="px-8 py-3 bg-[#8B5CF6] text-white font-semibold rounded-lg hover:bg-[#7C3AED] transition-all duration-200 hover:-translate-y-0.5 disabled:bg-[#4A5568] disabled:cursor-not-allowed flex items-center"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing Damage...
                </>
              ) : (
                'Analyze Damage'
              )}
            </button>
          </div>

          {isAnalyzing && (
            <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6] rounded-lg p-4 text-center">
              <p className="text-white font-medium">AI is analyzing vehicle damage...</p>
              <p className="text-sm text-[#A0AEC0] mt-1">This may take a few seconds</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
