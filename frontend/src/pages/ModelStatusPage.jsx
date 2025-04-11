import React, { useState, useEffect } from 'react';
import { FiInfo, FiExternalLink, FiFilter, FiRefreshCw } from 'react-icons/fi';

const ModelStatusPage = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, free, paid
  const [sortBy, setSortBy] = useState('name'); // name, provider, status

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch from the API
      // For now, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockModels = [
        { 
          id: '1', 
          name: 'Gemini 2.5 Pro', 
          provider: 'Google', 
          modelId: 'google/gemini-2.5-pro',
          isFree: true, 
          isAvailable: true,
          description: 'Versatile model for general tasks with strong reasoning capabilities',
          bestFor: ['Content Creation', 'Reasoning', 'General Tasks'],
          tokensPerSecond: 45,
          costPer1k: 0,
          documentationUrl: 'https://ai.google.dev/models/gemini'
        },
        { 
          id: '2', 
          name: 'DeepSeek Chat V3', 
          provider: 'DeepSeek', 
          modelId: 'deepseek-ai/deepseek-chat-v3',
          isFree: true, 
          isAvailable: true,
          description: 'Powerful open-source model with strong coding capabilities',
          bestFor: ['Coding', 'Technical Documentation', 'Problem Solving'],
          tokensPerSecond: 58,
          costPer1k: 0,
          documentationUrl: 'https://github.com/deepseek-ai/DeepSeek-V2'
        },
        { 
          id: '3', 
          name: 'Claude 3 Opus', 
          provider: 'Anthropic', 
          modelId: 'anthropic/claude-3-opus',
          isFree: false, 
          isAvailable: true,
          description: 'Anthropic\'s most powerful model with exceptional reasoning',
          bestFor: ['Complex Reasoning', 'Research', 'Creative Writing'],
          tokensPerSecond: 32,
          costPer1k: 15,
          documentationUrl: 'https://docs.anthropic.com/claude/docs'
        },
        { 
          id: '4', 
          name: 'GPT-4o', 
          provider: 'OpenAI', 
          modelId: 'openai/gpt-4o',
          isFree: false, 
          isAvailable: true,
          description: 'OpenAI\'s most capable model with multimodal capabilities',
          bestFor: ['Multimodal Tasks', 'Complex Reasoning', 'Creative Content'],
          tokensPerSecond: 40,
          costPer1k: 10,
          documentationUrl: 'https://platform.openai.com/docs/models'
        },
        { 
          id: '5', 
          name: 'Gemma 3 27B', 
          provider: 'Google', 
          modelId: 'google/gemma-3-27b-it',
          isFree: true, 
          isAvailable: true,
          description: 'Open-weight model optimized for instruction following',
          bestFor: ['Agent Development', 'Instruction Following', 'Tool Use'],
          tokensPerSecond: 35,
          costPer1k: 0,
          documentationUrl: 'https://ai.google.dev/gemma'
        },
        { 
          id: '6', 
          name: 'DeepSeek R1 Zero', 
          provider: 'DeepSeek', 
          modelId: 'deepseek-ai/deepseek-r1-zero',
          isFree: true, 
          isAvailable: false,
          description: 'Specialized model for reasoning and agent development',
          bestFor: ['Agent Development', 'Reasoning Chains', 'Tool Use'],
          tokensPerSecond: 30,
          costPer1k: 0,
          documentationUrl: 'https://github.com/deepseek-ai/DeepSeek-R1'
        },
      ];
      
      setModels(mockModels);
      setError(null);
    } catch (err) {
      console.error('Error fetching models:', err);
      setError('Failed to load model data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredModels = models.filter(model => {
    if (filter === 'free') return model.isFree;
    if (filter === 'paid') return !model.isFree;
    return true; // 'all'
  });

  const sortedModels = [...filteredModels].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'provider') return a.provider.localeCompare(b.provider);
    if (sortBy === 'status') return (b.isAvailable === a.isAvailable) ? 0 : b.isAvailable ? 1 : -1;
    return 0;
  });

  const handleRefresh = () => {
    fetchModels();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI Model Status</h1>
        <p className="text-gray-600 dark:text-gray-300">
          View the current status, capabilities, and performance metrics of supported AI models.
        </p>
      </div>

      {/* Filter and Controls */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${filter === 'all' ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
            >
              All Models
            </button>
            <button
              type="button"
              onClick={() => setFilter('free')}
              className={`px-4 py-2 text-sm font-medium ${filter === 'free' ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
            >
              Free Only
            </button>
            <button
              type="button"
              onClick={() => setFilter('paid')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${filter === 'paid' ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
            >
              Paid Only
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="name">Sort by Name</option>
              <option value="provider">Sort by Provider</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-800"
          >
            <FiRefreshCw className="mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Available Models</h3>
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-200">
              {models.filter(m => m.isAvailable).length} / {models.length}
            </span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-2">
            <div 
              className="h-2 bg-green-500 rounded-full dark:bg-green-600" 
              style={{ width: `${(models.filter(m => m.isAvailable).length / models.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {models.filter(m => m.isAvailable).length === models.length 
              ? 'All models are currently operational.' 
              : 'Some models are currently unavailable.'}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Free Models</h3>
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
              {models.filter(m => m.isFree).length} / {models.length}
            </span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-2">
            <div 
              className="h-2 bg-blue-500 rounded-full dark:bg-blue-600" 
              style={{ width: `${(models.filter(m => m.isFree).length / models.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {models.filter(m => m.isFree).length > 0 
              ? `${models.filter(m => m.isFree).length} models available for free use.` 
              : 'No free models currently available.'}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Average Speed</h3>
            <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full dark:bg-purple-900 dark:text-purple-200">
              {models.length > 0 ? Math.round(models.reduce((acc, model) => acc + model.tokensPerSecond, 0) / models.length) : 0} tokens/sec
            </span>
          </div>
          <div className="flex items-end space-x-1 h-12 mb-2">
            {models.map(model => (
              <div 
                key={model.id} 
                className="w-full bg-purple-500 dark:bg-purple-600 rounded-t" 
                style={{ 
                  height: `${(model.tokensPerSecond / Math.max(...models.map(m => m.tokensPerSecond))) * 100}%`,
                  opacity: model.isAvailable ? 1 : 0.5
                }}
                title={`${model.name}: ${model.tokensPerSecond} tokens/sec`}
              ></div>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Performance comparison across all models.
          </p>
        </div>
      </div>

      {/* Models Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-8">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Model Details</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Detailed information about each supported AI model.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500 dark:text-red-400">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Model
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Provider
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Best For
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Performance
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Cost
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Docs
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {sortedModels.length > 0 ? (
                  sortedModels.map((model) => (
                    <tr key={model.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {model.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {model.modelId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{model.provider}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${model.isAvailable ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                          {model.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                        <span className={`ml-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${model.isFree ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                          {model.isFree ? 'Free' : 'Paid'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {model.bestFor.map((use, index) => (
                            <span key={index} className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                              {use}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{model.tokensPerSecond} tokens/sec</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {model.costPer1k === 0 ? 'Free' : `$${model.costPer1k.toFixed(2)} per 1K tokens`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <a 
                          href={model.documentationUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 inline-flex items-center"
                        >
                          <FiExternalLink className="mr-1" />
                          Docs
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      No models found matching the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 flex items-start">
        <FiInfo className="text-blue-500 dark:text-blue-300 mt-1 mr-3 flex-shrink-0" size={20} />
        <div>
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">About Model Status</h4>
          <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
            This page displays real-time status information for AI models supported by PromptGen Pro. 
            Performance metrics are approximate and may vary based on model version, input complexity, and server load. 
            For the most accurate and up-to-date information, please refer to each provider's official documentation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModelStatusPage;