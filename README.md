# Scale AI - Car Insurance Claims Assessment Platform

## Overview
AI-powered claims assessment tool that reduces claim processing time from 2-3 days to under 5 minutes while maintaining high accuracy through intelligent human-AI collaboration. Built as a functional prototype demonstrating how computer vision and agent-assisted workflows can transform insurance operations.

**Built for:** Scale AI Product Manager Take-Home Assignment  
**Time Investment:** ~3.5 hours  
**Author:** Najneen Sultana | [LinkedIn](https://www.linkedin.com/in/najneen-sultana/) | [Portfolio](https://najneen-sultana-portfolio.vercel.app/)

---

## 🎥 Demo

**📹 Video Walkthrough:** [3-minute demo video] _(Add your Loom/YouTube link here)_  
**🚀 Live Prototype:** Run locally using instructions below

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:5173
```

**Requirements:** Node.js 18+ and npm

---

## ✨ Core Features

### 1. **Multi-Scenario Testing**
Select from predefined claim scenarios to test different damage severities and approval workflows:
- **Simple Minor Damage** → Auto-approval path
- **Moderate Damage** → Agent review required
- **Severe Damage** → Automatic escalation to senior adjuster

### 2. **Claims Initiation**
Structured intake form captures:
- Auto-generated claim IDs (CLM-2024-XXX format)
- Policy and policyholder information
- Vehicle details (make, model, year)
- Incident date
- Zip code

### 3. **Image Upload & Processing**
- Drag-and-drop or click-to-upload interface
- Real-time image preview
- Support for JPEG/PNG formats
- 2-second simulated AI processing with loading state

### 4. **AI Damage Assessment**
Mock computer vision analysis provides:
- **Damage Detection** with visual bounding boxes
- **Severity Classification** (Minor/Moderate/Severe) with confidence scores
- **Cost Estimation** with confidence ranges
- **Automatic Routing** (approve vs. escalate) based on risk thresholds

### 5. **Agent Review & Override Interface**
Agents can:
- Review each detected damage item individually
- Override AI severity classifications
- Adjust cost estimates based on local market knowledge
- Add contextual notes (prior damage, custom parts, etc.)
- See real-time total cost recalculation

### 6. **Decision Workflow**
- **Auto-Approval Path:** High confidence + low cost
- **Escalation Path:** Low confidence OR high cost
- Clear recommendation with reasoning displayed to agent

### 7. **Feedback Loop**
- Agents see how their corrections improve model accuracy
- Mock metrics show improvement from 78% → 89% accuracy
- Reinforces the value of human oversight in the AI system

---

## 🏗️ Tech Stack

- **Frontend:** React 18 with TypeScript
- **Styling:** Tailwind CSS for responsive, professional UI
- **Build Tool:** Vite for fast development
- **State Management:** React hooks (useState, useReducer)
- **AI Integration:** Mock responses simulating Scale's Rapid API for computer vision

**Note:** In production, this would integrate with Scale's Rapid API for real-time computer vision training and analysis. The current implementation uses realistic mock data to demonstrate the complete workflow.

---

## 📁 Project Structure

```
scale-ai-claims-analysis-prototype/
├── src/
│   ├── components/
│   │   ├── ScenarioSelector.tsx      # Pre-loaded test scenarios
│   │   ├── ClaimForm.tsx              # Claims intake form
│   │   ├── ImageUpload.tsx            # Drag-drop upload interface
│   │   ├── DamageAssessment.tsx       # AI results display
│   │   ├── DamageItemCard.tsx         # Individual damage item review
│   │   ├── AgentNotesSection.tsx      # Contextual notes input
│   │   ├── FeedbackMetrics.tsx        # Model improvement metrics
│   │   ├── ProgressIndicator.tsx      # Workflow progress tracker
│   │   └── ConfirmationScreen.tsx     # Final decision summary
│   ├── App.tsx                         # Main application logic
│   ├── main.tsx                        # React entry point
│   └── index.css                       # Global styles
├── package.json                        # Dependencies
├── vite.config.ts                      # Vite configuration
├── tailwind.config.js                  # Tailwind configuration
└── README.md                           # This file
```

---

## 🎯 Product Decisions & Human-AI Interaction

### **Core Philosophy: AI as Augmentation, Not Replacement**

The design prioritizes **intelligent assistance** over full automation, recognizing that insurance claims require human judgment for complex scenarios.

#### **What AI Provides:**
- **Speed:** Initial assessment in 2-3 seconds vs. 2-3 days manual
- **Consistency:** Standardized damage detection across all claims
- **Data-Driven Insights:** Cost estimates based on thousands of similar claims
- **Risk Assessment:** Automatic flagging of high-risk claims for escalation

#### **What Human Agents Provide:**
- **Context:** Information AI cannot see (prior repairs, custom modifications, local market factors)
- **Expertise:** Judgment for edge cases (classic cars, exotic vehicles, unusual damage patterns)
- **Final Authority:** Override capability on all AI assessments
- **Quality Control:** Corrections that improve model accuracy over time

#### **Interaction Design Principles:**

1. **Transparency:** Every AI prediction shows confidence scores so agents can assess reliability
2. **Explainability:** Damage detections display visual bounding boxes so agents can verify accuracy
3. **Control:** Agents have override authority on every assessment component (severity, cost, approval)
4. **Feedback Loop:** Agent corrections are captured and fed back to improve model training
5. **Progressive Disclosure:** Complex information is revealed step-by-step to prevent cognitive overload

#### **Approval Logic:**

```
IF (All damage confidence > 85% AND Total cost < $2,000)
   → Auto-Approve for Repair
ELSE
   → Escalate to Senior Adjuster
   → Re-review by agent (if low confidence)
```

This threshold balances **speed** (automating simple claims) with **safety** (human review for complex cases).

---

## 📊 Success Metrics

### **Primary Metrics:**
1. **Processing Time:** 2-3 days → **<5 minutes** (99% reduction)
2. **Damage Detection Accuracy:** **≥85%** agreement with human adjuster assessments
3. **Auto-Approval Rate:** **70%+** of simple claims approved without escalation
4. **Agent Adoption:** **80%+** of agents actively using the tool within 3 months

### **Secondary Metrics:**
- Reduction in claims backlog (days of pending claims)
- Customer satisfaction scores (NPS improvement)
- Cost per claim processed (operational efficiency)
- Model improvement rate (accuracy gains from agent feedback)

### **Risk Metrics (to monitor):**
- False positive rate for auto-approvals (paid invalid claims)
- False negative rate (escalated valid simple claims unnecessarily)
- Agent override rate (% of AI assessments changed)

---

## 🔒 Ethical Considerations & Risk Mitigation

### **Bias Prevention:**
- Model training on diverse vehicle types, damage scenarios, and geographic regions
- Regular audits for systematic over/under-estimation by vehicle make, model, or customer demographics
- Agent feedback loop to catch and correct model blind spots

### **Transparency:**
- Customers informed that AI assists in preliminary assessment
- All AI-influenced decisions are reviewed by licensed adjusters
- Clear appeals process if customers disagree with assessment

### **Data Privacy:**
- Claim images and data encrypted at rest and in transit
- PII redaction before using data for model training
- Compliance with insurance data regulations (HIPAA, GDPR where applicable)

### **Safety Guardrails:**
- No fully automated claim denials (human always in the loop for negative decisions)
- Mandatory human review for severe damage or high-cost claims
- Audit trail of all AI recommendations and agent overrides

---

## 🚧 Future Enhancements

### **Phase 2 (3-6 months):**
- **Multi-Image Upload:** Support for multiple angles per damage area
- **Scale Rapid API Integration:** Replace mock data with real computer vision analysis
- **Historical Claims Matching:** Surface similar past claims for agent reference
- **Mobile App:** Field adjuster app for on-site assessments

### **Phase 3 (6-12 months):**
- **Real-Time Collaboration:** Multiple agents can review same claim simultaneously
- **Predictive Repair Time:** Estimate days to repair based on parts availability
- **Fraud Detection:** Flag suspicious patterns (duplicate images, staged damage)
- **Automated Parts Ordering:** Trigger parts procurement for approved repairs

### **Phase 4 (12+ months):**
- **Customer Self-Service:** Allow policyholders to upload photos directly
- **Telematics Integration:** Import crash data from connected vehicles
- **Generative AI Summaries:** Auto-generate claim narratives for underwriting
- **Predictive Risk Modeling:** Identify high-risk policies before claims occur

---

## 📄 Full Product Requirements Document

**[View Complete PRD]** _(Add link to your Google Doc or PDF here)_

The full PRD covers:
- Detailed user stories and acceptance criteria
- Technical architecture and computer vision pipeline
- Go-to-market strategy and rollout plan
- Competitive analysis
- Risk assessment and mitigation strategies

---

## 🛠️ Technical Implementation Notes

### **Mock AI Response Structure:**
The prototype uses realistic mock data to simulate Scale's Rapid API responses:

```typescript
{
  damages: [
    {
      id: string,
      type: string,               // "Front Bumper Damage"
      severity: string,            // "Minor" | "Moderate" | "Severe"
      confidence: number,          // 0-100%
      estimatedCost: number,       // USD
      costRange: [number, number], // Min-max range
      boundingBox: {...}           // For visual overlay
    }
  ],
  totalEstimate: number,
  recommendation: string,          // "approve" | "escalate"
  processingTime: number           // milliseconds
}
```

### **State Management:**
Uses React's `useReducer` for complex claim state:
- Claim metadata (policy, claimant, vehicle, date)
- Uploaded image data
- AI assessment results
- Agent overrides and notes
- Final decision

### **Component Architecture:**
- **Presentational Components:** Render UI (DamageItemCard, ProgressIndicator)
- **Container Components:** Manage state (ClaimForm, DamageAssessment)
- **Smart Components:** Business logic (App.tsx orchestrates full workflow)

---

## 🎓 Key Learnings & Trade-offs

### **Decisions Made:**

1. **Single Image Upload (MVP):**  
   **Why:** Faster to build and test core workflow  
   **Trade-off:** Less comprehensive damage assessment  
   **Future:** Multi-image support in Phase 2

2. **Mock AI with Realistic Scenarios:**  
   **Why:** Demonstrates product thinking without API integration complexity  
   **Trade-off:** Not production-ready  
   **Future:** Scale Rapid API integration straightforward with current architecture

3. **Scenario Selector:**  
   **Why:** Allows reviewers to test different workflows quickly  
   **Trade-off:** Not in actual production UI  
   **Future:** Remove for production, keep for demo/testing environments

4. **Cost Override Instead of Cost Range Input:**  
   **Why:** Faster agent workflow  
   **Trade-off:** Less granular than min-max ranges  
   **Future:** A/B test both approaches with real agents

---

## 💬 Feedback & Questions

This prototype was built as part of Scale AI's Product Manager interview process. I'm happy to discuss:
- Product decisions and trade-offs
- Technical architecture choices
- Go-to-market and rollout strategy
- Metrics and success criteria
- Future roadmap prioritization

**Contact:** najneens@wharton.upenn.edu | 609-271-5242

---

## 📜 License

This project was created for Scale AI's interview process. Code is available for review purposes.

---

**Built with ❤️ by Najneen Sultana**  
*Wharton MBA '25 | Former Google Cloud Solutions Engineer | Product Manager*
