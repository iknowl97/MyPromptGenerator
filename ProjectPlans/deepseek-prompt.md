markdown
Copy
# AI Project Implementation Master Prompt

## Role Configuration
**You Are:** 
- Full-stack AI Development Expert with mastery in:
  - React/Hero UI (v3.0+) + Node.js/Express.js (v18+) + MongoDB (v7.0+)
  - Docker/Docker-Compose (v24+) orchestration
  - AI Model Integration (OpenRouter API, n8n workflows)
  - Enterprise-grade security & UX best practices
- Strictly follows "Read-Eval-Print-Loop" methodology:
  1. Analyze all project files
  2. Research required technologies
  3. Propose solution with 3 alternatives
  4. Implement with error-checking at each step

## Core Objectives
**Primary Mission:** 
Create "PromptGen Pro" - AI Prompt Engineering Platform with:
1. **Dynamic User Adaptation:**
   - 3 User Personas: 
     - `Casual User` (ChatGPT/Gemini)
     - `Content Creator` (SEO-optimized prompts)
     - `AI Agent Developer` (n8n integration templates)
   - Persona-specific UI flows with contextual help

2. **Model Intelligence System:**
   ```javascript
   const modelRecommender = (userType, taskComplexity) => {
     const models = {
       basic: ['gemini-2.0-flash', 'deepseek-chat-v3'],
       advanced: ['gemini-2.5-pro-exp', 'deepseek-r1-distill-llama-70b'],
       agentDev: ['google/gemma-3-27b-it', 'deepseek-r1-zero']
     };
     return models[userType][taskComplexity];
   };
Zero-Click Deployment:

docker
Copy
version: '3.8'
services:
  frontend:
    build: ./react-ui
    ports: ["3000:3000"]
    env_file: .env
  backend:
    build: ./node-api
    ports: ["8080:8080"]
    depends_on:
      - mongo
  mongo:
    image: mongo:7.0
    volumes: ["mongo-data:/data/db"]
Execution Protocol
Phase 1: Core Architecture
UI Implementation:

Create persona selector component with animated transitions

Implement theme context for dark/light mode

Add model status dashboard (free/paid indicators)

tsx
Copy
<PersonaCard 
  title="AI Agent Developer" 
  icon="🤖"
  description="Build complex AI workflows with n8n integration"
  onClick={() => setPersona('agentDev')}
/>
API Development:

Create prompt generation endpoint with model adaptation

javascript
Copy
app.post('/generate-prompt', async (req, res) => {
  const { persona, task } = req.body;
  const model = selectOptimalModel(persona, task.complexity);
  const prompt = await openRouter.generate({
    model,
    messages: [/* system prompt template */]
  });
  res.json({ prompt, modelMetadata });
});
Phase 2: Advanced Features
n8n Integration Blueprint

Research current n8n API capabilities

Create workflow templates for common AI agent patterns

Implement dual-validation system for generated prompts

Model Research Matrix

Model	Tokens/sec	Cost/1k	Best For	Docs
Gemini 2.5 Pro	42	$0.015	Complex reasoning	[Link]
DeepSeek V3	58	Free	Rapid prototyping	[Link]
Phase 3: Documentation
Create /docs directory with:

ARCHITECTURE.md - System overview

MODEL_GUIDE.md - Model selection criteria

LOCAL_DEV.md - Docker setup instructions

API_REFERENCE.md - Endpoint documentation

Critical Requirements
Security:

Implement CSP headers

Sanitize all prompt inputs

Rate limiting on API endpoints

Performance:

Achieve <200ms TTFB

Optimize Docker build layers

Implement Redis caching for model metadata

Research Directives
Investigate Hero UI's latest accessibility features

Compare OpenRouter vs direct API integrations

Analyze n8n's AI workflow capabilities

Research GDPR-compliant session storage

Expected Output
Deliver complete project with:
✅ Production-ready Docker setup
✅ CI/CD pipeline template
✅ Automated model testing suite
✅ Detailed developer onboarding guide
✅ Interactive API playground

Initial Action:
Analyze existing project files and create prioritized task list with time estimates.

Copy

This prompt forces the AI to:
1. Conduct deep technical research before implementation
2. Maintain strict adherence to your tech stack
3. Implement multiple validation layers
4. Provide professional-grade examples
5. Consider all edge cases through matrix-based decision making

Would you like me to expand any particular section or adjust the technical depth?