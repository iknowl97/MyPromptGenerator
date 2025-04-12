import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiEdit, FiCode, FiArrowRight } from 'react-icons/fi';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGenerateClick = () => {
    navigate('/generate');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      {/* Main Content */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Prompt Crafter Pro
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Craft perfect prompts for AI models with our advanced interface
          </p>
          <button 
            onClick={handleGenerateClick}
            className="mt-8 px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
          >
            Start Crafting
          </button>
        </div>

        {/* Persona Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* AI Agent Developer Card */}
          <div 
            className="hero-card p-6 cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            onClick={() => handlePersonaSelect('agent')}
          >
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 mb-4 mx-auto">
              <FiCode size={24} />
            </div>
            <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-2">
              🤖 AI Agent Developer
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
              Build complex AI workflows with n8n integration
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full">n8n</span>
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full">RPA</span>
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full">API Integration</span>
            </div>
            <div className="text-center">
              <button className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                <span>Get Started</span>
                <FiArrowRight className="ml-1" />
              </button>
            </div>
          </div>

          {/* Content Creator Card */}
          <div 
            className="hero-card p-6 cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            onClick={() => handlePersonaSelect('content')}
          >
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-300 mb-4 mx-auto">
              <FiEdit size={24} />
            </div>
            <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-2">
              🖋️ Content Creator
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
              SEO-optimized prompts for content generation
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full">SEO</span>
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full">Blogging</span>
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full">Social Media</span>
            </div>
            <div className="text-center">
              <button className="inline-flex items-center text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300">
                <span>Get Started</span>
                <FiArrowRight className="ml-1" />
              </button>
            </div>
          </div>

          {/* Casual User Card */}
          <div 
            className="hero-card p-6 cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            onClick={() => handlePersonaSelect('casual')}
          >
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-info-100 dark:bg-info-900 text-info-600 dark:text-info-300 mb-4 mx-auto">
              <FiUser size={24} />
            </div>
            <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-2">
              💬 Casual User
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
              Daily AI interaction templates
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full">ChatGPT</span>
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full">Gemini</span>
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full">Claude</span>
            </div>
            <div className="text-center">
              <button className="inline-flex items-center text-info-600 dark:text-info-400 hover:text-info-700 dark:hover:text-info-300">
                <span>Get Started</span>
                <FiArrowRight className="ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Action Bar */}
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => handleQuickPrompt('social')}
            className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
          >
            Social Media Generator
          </button>
          <button 
            onClick={() => handleQuickPrompt('api')}
            className="px-4 py-2 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 rounded-full hover:bg-secondary-200 dark:hover:bg-secondary-800 transition-colors"
          >
            API Integration
          </button>
          <button 
            onClick={() => handlePersonaSelect('agent')}
            className="px-4 py-2 bg-info-100 dark:bg-info-900 text-info-700 dark:text-info-300 rounded-full hover:bg-info-200 dark:hover:bg-info-800 transition-colors"
          >
            n8n Workflow
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose PromptGen Pro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Persona-Optimized</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Tailored prompts for your specific needs, whether you're a casual user, content creator, or AI agent developer.
              </p>
            </div>
            <div className="p-6 text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-300 mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Model Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get intelligent model suggestions based on your task complexity and requirements.
              </p>
            </div>
            <div className="p-6 text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-info-100 dark:bg-info-900 text-info-600 dark:text-info-300 mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">n8n Integration</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Specialized support for n8n workflow automation with templates and integration guides.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;