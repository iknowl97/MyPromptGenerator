import React, { useState } from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FiBook, FiCode, FiServer, FiTool, FiArrowRight, FiSearch } from 'react-icons/fi';

// Documentation content components
const GettingStarted = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
    <p className="mb-4">
      Welcome to PromptGen Pro! This guide will help you get started with our AI prompt engineering studio.
    </p>
    
    <h3 className="text-xl font-semibold mt-6 mb-3">What is PromptGen Pro?</h3>
    <p className="mb-4">
      PromptGen Pro is a specialized tool designed to help you create precision-crafted prompts for any AI workflow. 
      Whether you're a casual user, content creator, or AI agent developer, our platform provides tailored prompt 
      templates optimized for your specific needs.
    </p>
    
    <h3 className="text-xl font-semibold mt-6 mb-3">Key Features</h3>
    <ul className="list-disc pl-6 mb-4 space-y-2">
      <li>Persona-optimized prompt generation for different user types</li>
      <li>Intelligent model recommendations based on your task</li>
      <li>n8n workflow integration for AI agent developers</li>
      <li>Real-time model status monitoring</li>
      <li>Dark/light theme support</li>
    </ul>
    
    <h3 className="text-xl font-semibold mt-6 mb-3">Quick Start Guide</h3>
    <ol className="list-decimal pl-6 mb-4 space-y-2">
      <li>Select your user persona on the home page (Casual User, Content Creator, or AI Agent Developer)</li>
      <li>Fill out the prompt generation form with your specific requirements</li>
      <li>Review the generated prompt and recommended models</li>
      <li>Copy or download the prompt for use with your preferred AI model</li>
    </ol>
    
    <div className="bg-primary-50 dark:bg-primary-900 p-4 rounded-lg mt-6">
      <h4 className="text-lg font-semibold text-primary-700 dark:text-primary-300 mb-2">Pro Tip</h4>
      <p className="text-primary-600 dark:text-primary-400">
        For the best results, provide detailed information about your specific use case and desired outcome when generating prompts.
      </p>
    </div>
  </div>
);

const PromptGuide = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Prompt Engineering Guide</h2>
    <p className="mb-4">
      Learn how to craft effective prompts for different AI models and use cases.
    </p>
    
    <h3 className="text-xl font-semibold mt-6 mb-3">Prompt Structure</h3>
    <p className="mb-4">
      Effective prompts typically include these key components:
    </p>
    
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
      <ol className="list-decimal pl-6 space-y-2">
        <li><strong>Context:</strong> Background information the AI needs to understand</li>
        <li><strong>Instruction:</strong> Clear direction on what you want the AI to do</li>
        <li><strong>Input:</strong> Specific information for the AI to process</li>
        <li><strong>Output format:</strong> How you want the response structured</li>
        <li><strong>Examples:</strong> Sample inputs and outputs (for few-shot learning)</li>
      </ol>
    </div>
    
    <h3 className="text-xl font-semibold mt-6 mb-3">Best Practices</h3>
    <ul className="list-disc pl-6 mb-4 space-y-2">
      <li>Be specific and clear about what you want</li>
      <li>Break complex tasks into smaller steps</li>
      <li>Specify the desired tone and style</li>
      <li>Include examples for consistent formatting</li>
      <li>Use delimiters to separate different parts of your prompt</li>
      <li>Consider the model's strengths and limitations</li>
    </ul>
    
    <h3 className="text-xl font-semibold mt-6 mb-3">Model-Specific Tips</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <h4 className="font-semibold mb-2">Google Gemini Models</h4>
        <ul className="list-disc pl-6 space-y-1">
          <li>Excels at reasoning tasks</li>
          <li>Supports multimodal inputs</li>
          <li>Use step-by-step instructions</li>
        </ul>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <h4 className="font-semibold mb-2">DeepSeek Models</h4>
        <ul className="list-disc pl-6 space-y-1">
          <li>Strong coding capabilities</li>
          <li>Efficient for technical documentation</li>
          <li>Specify programming language when relevant</li>
        </ul>
      </div>
    </div>
    
    <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg mt-6">
      <h4 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Important Note</h4>
      <p className="text-yellow-600 dark:text-yellow-400">
        Different models have different capabilities and limitations. Always check the Model Status page for the most up-to-date information on supported models.
      </p>
    </div>
  </div>
);

const ApiReference = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">API Reference</h2>
    <p className="mb-4">
      Documentation for the PromptGen Pro API endpoints.
    </p>
    
    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Base URL</p>
      <code className="block bg-gray-200 dark:bg-gray-800 p-2 rounded font-mono text-sm">
        https://api.promptgenpro.com/v1
      </code>
    </div>
    
    <h3 className="text-xl font-semibold mt-6 mb-3">Authentication</h3>
    <p className="mb-4">
      All API requests require an API key passed in the header:
    </p>
    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
      <code className="block bg-gray-200 dark:bg-gray-800 p-2 rounded font-mono text-sm">
        Authorization: Bearer YOUR_API_KEY
      </code>
    </div>
    
    <h3 className="text-xl font-semibold mt-6 mb-3">Endpoints</h3>
    
    {/* Generate Prompt Endpoint */}
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-6 overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-200 mr-2">POST</span>
          <code className="font-mono text-sm">/prompts/generate</code>
        </div>
      </div>
      <div className="p-4">
        <p className="mb-4">Generate a prompt based on user type and requirements.</p>
        
        <h4 className="font-semibold mb-2">Request Body</h4>
        <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-4 overflow-x-auto">
{`{
  "userType": "agent",  // "agent", "content", or "casual"
  "task": "Build a workflow that extracts data from emails",
  "tone": "professional",  // "professional", "casual", "technical"
  "complexity": "medium",  // "low", "medium", "high"
  "n8nIntegration": true  // boolean
}`}
        </pre>
        
        <h4 className="font-semibold mb-2">Response</h4>
        <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto">
{`{
  "success": true,
  "data": {
    "title": "Email Data Extraction Workflow",
    "content": "You are an expert AI agent developer...",
    "userType": "agent",
    "tags": ["agent", "professional", "medium", "n8n"],
    "recommendedModels": [
      {
        "name": "Gemma 3 27B",
        "provider": "Google",
        "modelId": "google/gemma-3-27b-it"
      }
    ]
  }
}`}
        </pre>
      </div>
    </div>
    
    {/* Get Models Endpoint */}
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-6 overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200 mr-2">GET</span>
          <code className="font-mono text-sm">/models</code>
        </div>
      </div>
      <div className="p-4">
        <p className="mb-4">Get a list of all available AI models.</p>
        
        <h4 className="font-semibold mb-2">Query Parameters</h4>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">provider</code> - Filter by provider name</li>
          <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">isFree</code> - Filter by free/paid status (boolean)</li>
          <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">isAvailable</code> - Filter by availability (boolean)</li>
        </ul>
        
        <h4 className="font-semibold mb-2">Response</h4>
        <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto">
{`[
  {
    "id": "1",
    "name": "Gemini 2.5 Pro",
    "provider": "Google",
    "modelId": "google/gemini-2.5-pro",
    "isFree": true,
    "isAvailable": true,
    "description": "Versatile model for general tasks",
    "bestFor": ["Content Creation", "Reasoning"],
    "tokensPerSecond": 45,
    "costPer1k": 0,
    "documentationUrl": "https://ai.google.dev/models/gemini"
  }
]`}
        </pre>
      </div>
    </div>
  </div>
);

const N8nGuide = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">n8n Integration Guide</h2>
    <p className="mb-4">
      Learn how to integrate PromptGen Pro with n8n workflows for automated AI agent development.
    </p>
    
    <h3 className="text-xl font-semibold mt-6 mb-3">What is n8n?</h3>
    <p className="mb-4">
      n8n is a workflow automation tool that allows you to connect different services and automate tasks without coding. 
      By integrating PromptGen Pro with n8n, you can create sophisticated AI agents that can perform complex tasks automatically.
    </p>
    
    <h3 className="text-xl font-semibold mt-6 mb-3">Setup Instructions</h3>
    <ol className="list-decimal pl-6 mb-4 space-y-2">
      <li>Install n8n using npm: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">npm install n8n -g</code></li>
      <li>Start n8n: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">n8n start</code></li>
      <li>Access the n8n dashboard at <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">http://localhost:5678</code></li>
      <li>Add the HTTP Request node to make API calls to PromptGen Pro</li>
      <li>Configure authentication using your PromptGen Pro API key</li>
    </ol>
    
    <h3 className="text-xl font-semibold mt-6 mb-3">Example Workflow: Email Processing Agent</h3>
    <p className="mb-4">
      This example shows how to create an n8n workflow that processes emails using AI prompts generated by PromptGen Pro.
    </p>
    
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
      <h4 className="font-semibold mb-2">Workflow Steps</h4>
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          <strong>Trigger Node:</strong> IMAP Email
          <p className="text-sm text-gray-600 dark:text-gray-400">Monitors an email inbox for new messages</p>
        </li>
        <li>
          <strong>HTTP Request Node:</strong> PromptGen Pro API
          <p className="text-sm text-gray-600 dark:text-gray-400">Generates a prompt for email processing</p>
        </li>
        <li>
          <strong>HTTP Request Node:</strong> AI Model API
          <p className="text-sm text-gray-600 dark:text-gray-400">Sends the prompt and email content to an AI model</p>
        </li>
        <li>
          <strong>Function Node:</strong> Process Response
          <p className="text-sm text-gray-600 dark:text-gray-400">Extracts relevant information from the AI response</p>
        </li>
        <li>
          <strong>Airtable Node:</strong> Save Data
          <p className="text-sm text-gray-600 dark:text-gray-400">Stores the extracted information in a database</p>
        </li>
      </ol>
    </div>
    
    <div className="bg-primary-50 dark:bg-primary-900 p-4 rounded-lg mt-6">
      <h4 className="text-lg font-semibold text-primary-700 dark:text-primary-300 mb-2">Pro Tip</h4>
      <p className="text-primary-600 dark:text-primary-400">
        When creating AI agent workflows, use the "agent" user type in PromptGen Pro to get prompts specifically optimized for automation and tool use.
      </p>
    </div>
  </div>
);

const DocumentationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Default to getting-started if no specific route is selected
  React.useEffect(() => {
    if (location.pathname === '/docs' || location.pathname === '/docs/') {
      navigate('/docs/getting-started', { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real implementation, this would search through documentation
    // For now, just navigate to a relevant section based on keywords
    const query = searchQuery.toLowerCase();
    if (query.includes('api') || query.includes('endpoint')) {
      navigate('/docs/api');
    } else if (query.includes('n8n') || query.includes('workflow')) {
      navigate('/docs/n8n');
    } else if (query.includes('prompt') || query.includes('engineering')) {
      navigate('/docs/prompts');
    } else {
      navigate('/docs/getting-started');
    }
    setSearchQuery('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Documentation</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Learn how to use PromptGen Pro effectively for your AI prompt engineering needs.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-1/4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </form>
            
            <nav className="space-y-1">
              <NavLink 
                to="/docs/getting-started"
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`
                }
              >
                <FiBook className="mr-3" />
                Getting Started
              </NavLink>
              <NavLink 
                to="/docs/prompts"
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`
                }
              >
                <FiEdit className="mr-3" />
                Prompt Engineering Guide
              </NavLink>
              <NavLink 
                to="/docs/api"
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`
                }
              >
                <FiServer className="mr-3" />
                API Reference
              </NavLink>
              <NavLink 
                to="/docs/n8n"
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`
                }
              >
                <FiTool className="mr-3" />
                n8n Integration Guide
              </NavLink>
            </nav>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Need more help?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Can't find what you're looking for in our documentation?
            </p>
            <button 
              onClick={() => navigate('/generate?userType=casual&task=Help%20me%20with%20PromptGen%20Pro')}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-800"
            >
              <span>Ask AI Assistant</span>
              <FiArrowRight className="ml-2" />
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:w-3/4 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <Routes>
            <Route path="/getting-started" element={<GettingStarted />} />
            <Route path="/prompts" element={<PromptGuide />} />
            <Route path="/api" element={<ApiReference />} />
            <Route path="/n8n" element={<N8nGuide />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;