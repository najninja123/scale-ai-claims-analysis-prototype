import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: 'Claim Details' },
  { number: 2, label: 'Upload Image' },
  { number: 3, label: 'Review Assessment' },
  { number: 4, label: 'Complete' }
];

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="bg-[#1A1F26] border border-[#2D3748] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                  currentStep > step.number
                    ? 'bg-[#10B981] border-[#10B981] text-white'
                    : currentStep === step.number
                    ? 'bg-[#8B5CF6] border-[#8B5CF6] text-white'
                    : 'bg-[#252B36] border-[#2D3748] text-[#718096]'
                }`}
              >
                {currentStep > step.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="font-semibold">{step.number}</span>
                )}
              </div>
              <span
                className={`ml-3 text-sm font-medium ${
                  currentStep >= step.number ? 'text-white' : 'text-[#718096]'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 transition-colors duration-200 ${
                  currentStep > step.number ? 'bg-[#10B981]' : 'bg-[#2D3748]'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
