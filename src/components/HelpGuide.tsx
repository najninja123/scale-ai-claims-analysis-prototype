import { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

export default function HelpGuide() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (isOpen) {
    window.addEventListener('keydown', handleKeyDown);
  } else {
    window.removeEventListener('keydown', handleKeyDown);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-5 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl flex items-center gap-2 font-medium"
      >
        <HelpCircle className="w-5 h-5" />
        How to Use
      </button>

      {isOpen && (
        <>
          <div
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          />

          <div className="fixed top-0 right-0 h-full w-[360px] max-w-[90vw] bg-[#1A1F26] z-50 shadow-2xl overflow-y-auto animate-slide-in">
            <div className="sticky top-0 bg-[#1A1F26] border-b border-[#2D3748] p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                📖 How to Use This Prototype
              </h2>
              <button
                onClick={handleClose}
                className="text-[#A0AEC0] hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <section>
                <div className="h-px bg-[#8B5CF6] mb-4"></div>
                <h3 className="text-lg font-bold text-white mb-3">🎯 WHAT IT DOES</h3>
                <div className="h-px bg-[#8B5CF6] mb-4"></div>

                <p className="text-[#A0AEC0] text-sm mb-3">
                  AI-powered vehicle damage assessment that:
                </p>
                <ul className="text-[#A0AEC0] text-sm space-y-2 mb-3">
                  <li>• Detects damage from photos</li>
                  <li>• Generates repair estimates</li>
                  <li>• Recommends repair shops</li>
                  <li>• Routes claims automatically</li>
                </ul>
                <p className="text-[#A0AEC0] text-sm mb-2">
                  Three decision paths based on cost + confidence:
                </p>
                <ul className="text-[#A0AEC0] text-sm space-y-2">
                  <li>• ✓ Auto-Approve (low cost, high confidence)</li>
                  <li>• → Escalate (high cost)</li>
                  <li>• ⚠️ Agent Review (low confidence)</li>
                </ul>
              </section>

              <section>
                <div className="h-px bg-[#8B5CF6] mb-4"></div>
                <h3 className="text-lg font-bold text-white mb-3">🚀 QUICK START</h3>
                <div className="h-px bg-[#8B5CF6] mb-4"></div>

                <ol className="text-[#A0AEC0] text-sm space-y-2">
                  <li>1. Fill out form with claim metadata</li>
                  <li>2. Upload any vehicle damage image</li>
                  <li>3. Click "Submit" to see AI assessment</li>
                  <li>4. Review damage detections and estimate</li>
                  <li>5. Approve or escalate the claim</li>
                </ol>
              </section>

              <section>
                <div className="h-px bg-[#8B5CF6] mb-4"></div>
                <h3 className="text-lg font-bold text-white mb-3">⭐ KEY FEATURE: SCENARIO TOGGLE</h3>
                <div className="h-px bg-[#8B5CF6] mb-4"></div>

                <p className="text-[#A0AEC0] text-sm mb-4">
                  Use the dropdown at the top of the Review Assessment page to switch between scenarios:
                </p>

                <div className="space-y-3 mb-4">
                  <div className="bg-[#10B981]/10 border border-[#10B981] rounded-lg p-3">
                    <p className="text-[#10B981] font-semibold text-sm mb-1">Scenario 1: Auto-Approve</p>
                    <p className="text-[#A0AEC0] text-xs mb-1">$1,820 total | 92% confidence</p>
                    <p className="text-[#A0AEC0] text-xs">→ Approved instantly</p>
                  </div>

                  <div className="bg-[#F59E0B]/10 border border-[#F59E0B] rounded-lg p-3">
                    <p className="text-[#F59E0B] font-semibold text-sm mb-1">Scenario 2: Direct Escalation</p>
                    <p className="text-[#A0AEC0] text-xs mb-1">$4,650 total | 91% confidence</p>
                    <p className="text-[#A0AEC0] text-xs">→ Sent to senior adjuster (cost too high)</p>
                  </div>

                  <div className="bg-[#EF4444]/10 border border-[#EF4444] rounded-lg p-3">
                    <p className="text-[#EF4444] font-semibold text-sm mb-1">Scenario 3: Agent Re-Assessment</p>
                    <p className="text-[#A0AEC0] text-xs mb-1">$1,950 total | 75% confidence</p>
                    <p className="text-[#A0AEC0] text-xs">→ Agent reviews and adjusts (AI uncertain)</p>
                  </div>
                </div>

                <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6] rounded-lg p-3">
                  <p className="text-[#8B5CF6] text-sm flex items-start gap-2">
                    <span>💡</span>
                    <span>Toggle between these to see all three decision paths without restarting!</span>
                  </p>
                </div>
              </section>

              <section>
                <div className="h-px bg-[#8B5CF6] mb-4"></div>
                <h3 className="text-lg font-bold text-white mb-3">✏️ THINGS TO TRY</h3>
                <div className="h-px bg-[#8B5CF6] mb-4"></div>

                <ul className="text-[#A0AEC0] text-sm space-y-2">
                  <li>□ Toggle scenarios on Review Assessment page</li>
                  <li>□ Click "Add Agent Notes" on any damage card</li>
                  <li>□ In Scenario 3: Adjust severity dropdown</li>
                  <li>□ Watch for "Feedback Captured" indicator</li>
                  <li>□ Toggle scenarios on Completion page too</li>
                  <li>□ Check the Senior Adjuster Decision Package</li>
                </ul>
              </section>

              <section>
                <div className="h-px bg-[#8B5CF6] mb-4"></div>
                <h3 className="text-lg font-bold text-white mb-3">💡 KEY DIFFERENTIATORS</h3>
                <div className="h-px bg-[#8B5CF6] mb-4"></div>

                <ul className="text-[#A0AEC0] text-sm space-y-2">
                  <li>• 2×2 decision matrix (not binary)</li>
                  <li>• Detailed repair estimates (parts + labor)</li>
                  <li>• Location-based shop recommendations</li>
                  <li>• AI confidence explanations</li>
                  <li>• Agent feedback → AI improvement loop</li>
                  <li>• Complete senior adjuster decision package</li>
                </ul>
              </section>

              <section>
                <div className="h-px bg-[#8B5CF6] mb-4"></div>
                <h3 className="text-lg font-bold text-white mb-3">📊 EXPECTED IMPACT</h3>
                <div className="h-px bg-[#8B5CF6] mb-4"></div>

                <ul className="text-[#A0AEC0] text-sm space-y-2">
                  <li>• 95% faster processing (days → minutes)</li>
                  <li>• 60% lower cost per claim</li>
                  <li>• 60-70% of claims auto-approved</li>
                  <li>• 3x senior adjuster capacity</li>
                </ul>
              </section>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
