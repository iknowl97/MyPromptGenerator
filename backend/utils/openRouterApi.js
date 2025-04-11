const axios = require('axios');

/**
 * Utility for interacting with the OpenRouter API
 * Documentation: https://openrouter.ai/docs
 */
class OpenRouterApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://openrouter.ai/api/v1';
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'HTTP-Referer': 'https://promptgenpro.com', // Replace with your actual domain
        'X-Title': 'PromptGen Pro'
      }
    });
  }

  /**
   * Generate a completion using the specified model
   * @param {string} modelId - The model ID to use for generation
   * @param {Array} messages - Array of message objects with role and content
   * @param {Object} options - Additional options for the API call
   * @returns {Promise} - The API response
   */
  async generateCompletion(modelId, messages, options = {}) {
    try {
      const response = await this.client.post('/chat/completions', {
        model: modelId,
        messages,
        ...options
      });
      
      return response.data;
    } catch (error) {
      console.error('Error generating completion:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Get available models from OpenRouter
   * @returns {Promise} - The API response with available models
   */
  async getAvailableModels() {
    try {
      const response = await this.client.get('/models');
      return response.data;
    } catch (error) {
      console.error('Error fetching models:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Generate a prompt based on user type and task
   * @param {string} userType - The type of user (casual, content, agent)
   * @param {string} task - The task description
   * @param {Object} options - Additional options for prompt generation
   * @returns {Promise} - The generated prompt
   */
  async generatePrompt(userType, task, options = {}) {
    const { tone = 'professional', complexity = 'medium', n8nIntegration = false } = options;
    
    // Select appropriate model based on user type and complexity
    let modelId;
    if (userType === 'agent') {
      modelId = complexity === 'high' 
        ? 'google/gemma-3-27b-it' 
        : 'deepseek/deepseek-r1-zero';
    } else if (userType === 'content') {
      modelId = 'google/gemini-2.5-pro-exp-03-25';
    } else {
      modelId = 'google/gemini-2.0-flash-exp';
    }
    
    // Create system message based on user type
    let systemMessage = '';
    if (userType === 'agent') {
      systemMessage = `You are an expert AI prompt engineer specializing in creating prompts for AI agent development${n8nIntegration ? ' with n8n workflow integration' : ''}. Your task is to create a detailed, effective prompt that will help the user build an AI agent for: ${task}. The prompt should be structured, comprehensive, and follow best practices for AI agent development.`;
    } else if (userType === 'content') {
      systemMessage = `You are an expert AI prompt engineer specializing in content creation. Your task is to create a detailed, effective prompt that will help the user generate high-quality content about: ${task}. The prompt should be structured to elicit well-organized, engaging, and accurate content.`;
    } else {
      systemMessage = `You are an expert AI prompt engineer. Your task is to create a simple but effective prompt that will help the user with: ${task}. The prompt should be clear, concise, and easy to understand.`;
    }
    
    // Add tone and complexity guidance
    systemMessage += `\n\nThe prompt should use a ${tone} tone and be optimized for ${complexity} complexity tasks.`;
    
    // Add n8n specific instructions if needed
    if (n8nIntegration) {
      systemMessage += `\n\nInclude specific instructions for integrating this prompt within n8n workflows, including potential node configurations and data passing between nodes.`;
    }
    
    const messages = [
      { role: 'system', content: systemMessage },
      { role: 'user', content: `Please create a prompt for ${task}. I need this for ${userType === 'agent' ? 'developing an AI agent' : userType === 'content' ? 'content creation' : 'general use'}.` }
    ];
    
    try {
      const response = await this.generateCompletion(modelId, messages, {
        temperature: userType === 'content' ? 0.7 : 0.5,
        max_tokens: 1000
      });
      
      return {
        title: `Prompt for ${task}`,
        content: response.choices[0].message.content,
        userType,
        tags: [userType, tone, complexity, ...(n8nIntegration ? ['n8n'] : [])],
        recommendedModels: [modelId],
        useCase: task,
      };
    } catch (error) {
      console.error('Error generating prompt:', error);
      throw error;
    }
  }
}

module.exports = OpenRouterApi;