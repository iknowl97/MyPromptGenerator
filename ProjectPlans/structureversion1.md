markdown
Copy
# PromptGen Pro Website Structure

## 1. Main Layout Structure
```tsx
<HeroUI.RootLayout theme="system">
  <HeroUI.StickyHeader>
    <HeroUI.NavBar brandLogo="/logo.svg" darkModeToggle={true}>
      <HeroUI.NavItem href="/docs" label="Documentation" />
      <HeroUI.ModelStatusIndicator 
        models={modelList} 
        freeCount={15} 
        premiumCount={8}
      />
    </HeroUI.NavBar>
  </HeroUI.StickyHeader>

  <HeroUI.GradientBackground>
    {/* Main Content Sections */}
  </HeroUI.GradientBackground>

  <HeroUI.Footer>
    <HeroUI.FooterSection title="Resources">
      <HeroUI.FooterLink href="/model-status" label="Model Status" />
      <HeroUI.FooterLink href="/ai-news" label="AI Digest (Coming Soon)" />
    </HeroUI.FooterSection>
  </HeroUI.Footer>
</HeroUI.RootLayout>
2. Homepage Sections (/)
tsx
Copy
<HeroUI.HeroSection>
  <HeroUI.CenteredContent>
    <HeroUI.Headline 
      title="AI Prompt Engineering Studio" 
      subtitle="Precision-crafted prompts for any AI workflow"
    />
    
    <HeroUI.SearchBar 
      placeholder="Describe your AI task..."
      actionText="Generate Prompt"
    />
  </HeroUI.CenteredContent>

  <HeroUI.CardGrid columns={3}>
    <HeroUI.InteractiveCard 
      title="🤖 AI Agent Developer"
      description="Build complex AI workflows with n8n integration"
      hoverEffect="glow"
      onClick={handleAgentSelect}
    >
      <HeroUI.TechBadges badges={["n8n", "RPA", "API Integration"]} />
    </HeroUI.InteractiveCard>

    <HeroUI.InteractiveCard 
      title="🖋️ Content Creator"
      description="SEO-optimized prompts for content generation"
      hoverEffect="scale"
    >
      <HeroUI.TechBadges badges={["SEO", "Blogging", "Social Media"]} />
    </HeroUI.InteractiveCard>

    <HeroUI.InteractiveCard 
      title="💬 Casual User"
      description="Daily AI interaction templates"
      hoverEffect="lift"
    >
      <HeroUI.TechBadges badges={["ChatGPT", "Gemini", "Claude"]} />
    </HeroUI.InteractiveCard>
  </HeroUI.CardGrid>

  <HeroUI.QuickActionBar>
    <HeroUI.PillButton 
      variant="ai" 
      label="Social Media Generator"
      onClick={handleSocialPrompt}
    />
    <HeroUI.PillButton 
      variant="code" 
      label="API Integration"
      onClick={handleAPIPrompt}
    />
    <HeroUI.PillButton 
      variant="cloud" 
      label="n8n Workflow"
      onClick={handlen8nPrompt}
    />
  </HeroUI.QuickActionBar>
</HeroUI.HeroSection>
3. Prompt Generator Page (/generate)
tsx
Copy
<HeroUI.FormLayout>
  <HeroUI.Sidebar>
    <HeroUI.PersonaSwitch 
      options={[
        {value: 'agent', label: 'AI Developer', icon: '🤖'},
        {value: 'creator', label: 'Content Creator', icon: '🖋️'},
        {value: 'casual', label: 'Everyday User', icon: '💬'}
      ]}
    />
    
    <HeroUI.ModelRecommendation 
      models={selectedModels}
      pricingTier="free"
    />
  </HeroUI.Sidebar>

  <HeroUI.MainForm>
    <HeroUI.StepForm>
      <HeroUI.FormSection title="Task Definition">
        <HeroUI.TextArea 
          label="Describe your goal"
          placeholder="I need to create an AI agent that..."
          smartValidation={true}
        />
        
        <HeroUI.Dropdown 
          options={toneOptions} 
          label="Output Tone"
          defaultValue="professional"
        />
      </HeroUI.FormSection>

      <HeroUI.FormSection title="Advanced Settings">
        <HeroUI.ToggleSwitch 
          label="Enable n8n Integration"
          description="Connect workflow automation"
        />
        
        <HeroUI.RangeSlider
          label="Creativity Level"
          min={0} 
          max={100}
          step={10}
        />
      </HeroUI.FormSection>
    </HeroUI.StepForm>
  </HeroUI.MainForm>

  <HeroUI.PreviewPanel>
    <HeroUI.LivePreview 
      content={generatedPrompt} 
      mode="markdown"
    />
    <HeroUI.ModelStats 
      tokensUsed={tokenCount}
      costEstimate={costEstimate}
    />
  </HeroUI.PreviewPanel>
</HeroUI.FormLayout>
4. Model Status Page (/model-status)
tsx
Copy
<HeroUI.DataGrid>
  <HeroUI.Table 
    columns={[
      {header: "Model", accessor: "name"},
      {header: "Status", accessor: "status"},
      {header: "Cost", accessor: "cost"},
      {header: "Best For", accessor: "useCase"}
    ]}
    data={modelStatusData}
    rowStyle={(row) => ({
      background: row.cost === 'Free' ? 'var(--free-bg)' : 'var(--pro-bg)'
    })}
  />
  
  <HeroUI.Chart 
    type="bar" 
    data={modelUsageData} 
    title="Model Performance Metrics"
  />
</HeroUI.DataGrid>
5. Documentation Page (/docs)
tsx
Copy
<HeroUI.DocsLayout>
  <HeroUI.DocsSidebar>
    <HeroUI.NavTree>
      <HeroUI.NavItem label="Getting Started" />
      <HeroUI.NavItem label="API Reference">
        <HeroUI.SubItem label="Prompt Generation" />
        <HeroUI.SubItem label="Model Selection" />
      </HeroUI.NavItem>
      <HeroUI.NavItem label="n8n Integration Guide" />
    </HeroUI.NavTree>
  </HeroUI.DocsSidebar>

  <HeroUI.DocsContent>
    <HeroUI.CodeBlock 
      language="bash"
      content="docker-compose up -d"
    />
    
    <HeroUI.Alert 
      variant="info" 
      content="Always verify model compatibility before production use"
    />
  </HeroUI.DocsContent>
</HeroUI.DocsLayout>
Key HeroUI Features Utilized:

Dynamic theme adaptation using theme="system"

Sticky header with model status indicator

Interactive card grid for persona selection

Floating action buttons for quick prompts

Step-form layout with live preview

Data visualization components

Responsive documentation layout

Context-aware validation systems

Dark Mode Implementation:

tsx
Copy
// Using HeroUI's theme context
const ThemeWrapper = () => (
  <HeroUI.ThemeProvider
    lightTheme={lightTheme}
    darkTheme={darkTheme}
    storageKey="promptgen-theme"
  >
    <App />
  </HeroUI.ThemeProvider>
);
This structure provides:

Instant persona switching

Real-time cost calculations

Model performance comparisons

Context-sensitive help system

Seamless dark/light mode

Progressive disclosure of complex features

Multi-layer input validation