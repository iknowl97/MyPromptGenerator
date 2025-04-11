import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiUser, FiEdit, FiCode, FiSliders, FiSend, FiCopy, FiDownload } from 'react-icons/fi';

const GeneratePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  // Get userType from URL params or default to 'casual'
  const [userType, setUserType] = useState(queryParams.get('userType') || 'casual');
  const [promptType, setPromptType] = useState(queryParams.get('promptType') || '');
  
  // Form state
  const [task, setTask] = useState('');
  const [tone, setTone] = useState('professional');
  const [complexity, setComplexity] = useState('medium');
  const [n8nIntegration, setN8nIntegration] = useState(false);
  
  // Generated prompt state
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendedModels, setRecommendedModels] = useState([]);
  
  // Set URL params when userType changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set('userType', userType);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    
    // Reset form when userType changes
    setGeneratedPrompt(null);
    
    // Set default values based on userType
    if (userType === 'agent') {
      setN8nIntegration(true);
      setComplexity('high');
    } else {
      setN8nIntegration(false);
    }
  }, [userType, location.pathname, navigate]);
  
  // Set default task based on promptType (for quick actions)
  useEffect(() => {
    if (promptType === 'social') {
      setTask('Create engaging social media posts for my business');
      setUserType('content');
    } else if (promptType === 'api') {
      setTask('Build an API integration workflow');
      setUserType('agent');
    }
  }, [promptType]);
  
  // Fetch recommended models based on userType
  useEffect(() => {
    // In a real implementation, this would fetch from the API
    // For now, we'll use mock data
    const mockRecommendedModels = {
      agent: [
        { name: 'Gemma 3 27B', provider: 'Google', isFree: true },
        { name: 'DeepSeek R1 Zero', provider: 'DeepSeek', isFree: true },
      ],
      content: [
        { name: 'Gemini 2.5 Pro', provider: 'Google', isFree: true },
        { name: 'DeepSeek Chat V3', provider: 'DeepSeek', isFree: true },
      ],
      casual: [
        { name: 'Gemini 2.0 Flash', provider: 'Google', isFree: true },
        { name: 'DeepSeek Chat', provider: 'DeepSeek', isFree: true },
      ],
    };
    
    setRecommendedModels(mockRecommendedModels[userType] || []);
  }, [userType]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      // In a real implementation, this would call the API
      // For now, we'll simulate a delay and return mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let promptContent = '';
      
      if (userType === 'agent') {
        promptContent = `You are an expert AI agent developer. Your task is to create a sophisticated AI agent that can ${task}.\n\nThe agent should be designed with ${complexity} complexity and use a ${tone} tone in its interactions.${n8nIntegration ? '\n\nThis agent should be integrated with n8n workflows for automation. Include specific node configurations and data passing between nodes.' : ''}\n\nPlease provide a detailed implementation plan, including:\n1. System architecture\n2. Required API integrations\n3. Prompt templates for each component\n4. Testing and validation strategy`;
      } else if (userType === 'content') {
        promptContent = `You are an expert content creator. Your task is to create high-quality content about ${task}.\n\nThe content should have ${complexity} complexity and use a ${tone} tone.\n\nPlease structure your response with:\n1. An engaging headline\n2. An introduction that hooks the reader\n3. Main sections with valuable information\n4. A conclusion with a call to action\n5. SEO-friendly elements throughout`;
      } else {
        promptContent = `You are a helpful AI assistant. I need your help with ${task}.\n\nPlease provide a response that is ${complexity} in complexity and uses a ${tone} tone.\n\nMake your response clear, concise, and directly addressing my request.`;
      }
      
      setGeneratedPrompt({
        title: `Prompt for ${task}`,
        content: promptContent,
        userType,
        tags: [userType, tone, complexity, ...(n8nIntegration ? ['n8n'] : [])],
      });
    } catch (error) {
      console.error('Error generating prompt:', error);
      // Handle error
    } finally {
      setIsGenerating(false);
    }
  };
  
  const copyToClipboard = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt.content);
      // Show toast or notification
      alert('Prompt copied to clipboard!');
    }
  };
  
  const downloadPrompt = () => {
    if (generatedPrompt) {
      const element = document.createElement('a');
      const file = new Blob([generatedPrompt.content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${generatedPrompt.title.replace(/ /g, '_')}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Select User Type</h2>
            <div className="flex flex-col space-y-2">
              <button
                className={`flex items-center p-3 rounded-lg ${userType === 'casual' ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                onClick={() => setUserType('casual')}
              >
                <FiUser className="mr-2" />
                <span>Casual AI User</span>
              </button>
              <button
                className={`flex items-center p-3 rounded-lg ${userType === 'content' ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                onClick={() => setUserType('content')}
              >
                <FiEdit className="mr-2" />
                <span>Content Creator</span>
              </button>
              <button
                className={`flex items-center p-3 rounded-lg ${userType === 'agent' ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                onClick={() => setUserType('agent')}
              >
                <FiCode className="mr-2" />
                <span>AI Agent Developer</span>
              </button>
            </div>
          </div>
          
          {/* Recommended Models */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recommended Models</h2>
            <div className="space-y-3">
              {recommendedModels.map((model, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{model.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{model.provider}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    {model.isFree ? 'Free' : 'Paid'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {userType === 'agent' ? 'AI Agent Development Prompt' : 
               userType === 'content' ? 'Content Creation Prompt' : 
               'General AI Prompt'}
            </h1>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="task" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Describe your goal
                </label>
                <textarea
                  id="task"
                  className="hero-textarea"
                  placeholder={userType === 'agent' ? 'I need to create an AI agent that...' : 
                              userType === 'content' ? 'I need to create content about...' : 
                              'I need help with...'}
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  required
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Output Tone
                  </label>
                  <select
                    id="tone"
                    className="hero-input"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="friendly">Friendly</option>
                    <option value="authoritative">Authoritative</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="complexity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Complexity Level
                  </label>
                  <select
                    id="complexity"
                    className="hero-input"
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                  >
                    <option value="low">Low - Simple and straightforward</option>
                    <option value="medium">Medium - Balanced detail</option>
                    <option value="high">High - Comprehensive and detailed</option>
                  </select>
                </div>
              </div>
              
              {userType === 'agent' && (
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      id="n8nIntegration"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      checked={n8nIntegration}
                      onChange={(e) => setN8nIntegration(e.target.checked)}
                    />
                    <label htmlFor="n8nIntegration" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Enable n8n Integration
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Optimize prompt for n8n workflow automation
                  </p>
                </div>
              )}
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="hero-button-primary flex items-center"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      Generate Prompt
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* Generated Prompt Preview */}
          {generatedPrompt && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Generated Prompt
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    title="Copy to clipboard"
                  >
                    <FiCopy />
                  </button>
                  <button
                    onClick={downloadPrompt}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    title="Download as text file"
                  >
                    <FiDownload />
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200">
                  {generatedPrompt.content}
                </pre>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {generatedPrompt.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;