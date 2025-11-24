import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface ClaimFormProps {
  claimData: any;
  updateClaimData: (updates: any) => void;
}

export default function ClaimForm({ claimData, updateClaimData }: ClaimFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const generateClaimId = () => {
    const randomNum = Math.floor(Math.random() * 900) + 100;
    return `CLM-2025-${randomNum}`;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!claimData.policyNumber) newErrors.policyNumber = 'Policy number is required';
    if (!claimData.policyholderName) newErrors.policyholderName = 'Policyholder name is required';
    if (!claimData.vehicleMake) newErrors.vehicleMake = 'Vehicle make is required';
    if (!claimData.vehicleModel) newErrors.vehicleModel = 'Vehicle model is required';
    if (!claimData.vehicleYear) newErrors.vehicleYear = 'Vehicle year is required';
    if (!claimData.incidentDate) newErrors.incidentDate = 'Incident date is required';
    if (!claimData.zipCode) newErrors.zipCode = 'Zip code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const claimId = generateClaimId();
      updateClaimData({ claimId, currentStep: 2 });
    }
  };

  const handleChange = (field: string, value: string) => {
    updateClaimData({ [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="bg-[#1A1F26] border border-[#2D3748] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] p-8">
      <h2 className="text-[28px] font-bold text-white mb-2">Claim Details</h2>
      <p className="text-[#A0AEC0] text-sm mb-8">Enter the policyholder and vehicle information to begin the assessment process.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Policy Number <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              value={claimData.policyNumber}
              onChange={(e) => handleChange('policyNumber', e.target.value)}
              className={`w-full px-4 py-3 bg-[#252B36] border rounded-lg text-white text-sm placeholder-[#718096] focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all ${
                errors.policyNumber ? 'border-[#EF4444]' : 'border-[#2D3748]'
              }`}
              placeholder="Enter policy number"
            />
            {errors.policyNumber && (
              <div className="flex items-center mt-1 text-[#EF4444] text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.policyNumber}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Policyholder Name <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              value={claimData.policyholderName}
              onChange={(e) => handleChange('policyholderName', e.target.value)}
              className={`w-full px-4 py-3 bg-[#252B36] border rounded-lg text-white text-sm placeholder-[#718096] focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all ${
                errors.policyholderName ? 'border-[#EF4444]' : 'border-[#2D3748]'
              }`}
              placeholder="Enter full name"
            />
            {errors.policyholderName && (
              <div className="flex items-center mt-1 text-[#EF4444] text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.policyholderName}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Vehicle Make <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              value={claimData.vehicleMake}
              onChange={(e) => handleChange('vehicleMake', e.target.value)}
              className={`w-full px-4 py-3 bg-[#252B36] border rounded-lg text-white text-sm placeholder-[#718096] focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all ${
                errors.vehicleMake ? 'border-[#EF4444]' : 'border-[#2D3748]'
              }`}
              placeholder="e.g., Toyota"
            />
            {errors.vehicleMake && (
              <div className="flex items-center mt-1 text-[#EF4444] text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.vehicleMake}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Vehicle Model <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              value={claimData.vehicleModel}
              onChange={(e) => handleChange('vehicleModel', e.target.value)}
              className={`w-full px-4 py-3 bg-[#252B36] border rounded-lg text-white text-sm placeholder-[#718096] focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all ${
                errors.vehicleModel ? 'border-[#EF4444]' : 'border-[#2D3748]'
              }`}
              placeholder="e.g., Camry"
            />
            {errors.vehicleModel && (
              <div className="flex items-center mt-1 text-[#EF4444] text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.vehicleModel}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Vehicle Year <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="number"
              min="1990"
              max="2025"
              value={claimData.vehicleYear}
              onChange={(e) => handleChange('vehicleYear', e.target.value)}
              className={`w-full px-4 py-3 bg-[#252B36] border rounded-lg text-white text-sm placeholder-[#718096] focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all ${
                errors.vehicleYear ? 'border-[#EF4444]' : 'border-[#2D3748]'
              }`}
              placeholder="e.g., 2020"
            />
            {errors.vehicleYear && (
              <div className="flex items-center mt-1 text-[#EF4444] text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.vehicleYear}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Incident Date <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="date"
              value={claimData.incidentDate}
              onChange={(e) => handleChange('incidentDate', e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 bg-[#252B36] border rounded-lg text-white text-sm placeholder-[#718096] focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all ${
                errors.incidentDate ? 'border-[#EF4444]' : 'border-[#2D3748]'
              }`}
            />
            {errors.incidentDate && (
              <div className="flex items-center mt-1 text-[#EF4444] text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.incidentDate}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Zip Code <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              value={claimData.zipCode}
              onChange={(e) => handleChange('zipCode', e.target.value)}
              maxLength={5}
              className={`w-full px-4 py-3 bg-[#252B36] border rounded-lg text-white text-sm placeholder-[#718096] focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all ${
                errors.zipCode ? 'border-[#EF4444]' : 'border-[#2D3748]'
              }`}
              placeholder="e.g., 94103"
            />
            {errors.zipCode && (
              <div className="flex items-center mt-1 text-[#EF4444] text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.zipCode}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="px-8 py-3 bg-[#8B5CF6] text-white font-semibold rounded-lg hover:bg-[#7C3AED] transition-all duration-200 hover:-translate-y-0.5 focus:ring-4 focus:ring-[#8B5CF6]/30"
          >
            Begin Assessment
          </button>
        </div>
      </form>
    </div>
  );
}
