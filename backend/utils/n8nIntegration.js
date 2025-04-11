const axios = require('axios');

/**
 * Utility for n8n workflow integration
 * Provides functionality for generating prompts specifically for n8n automation
 */
class N8nIntegration {
  /**
   * Generate a template for n8n workflow integration
   * @param {string} task - The task description
   * @param {Object} options - Additional options for template generation
   * @returns {Object} - The generated template
   */
  static generateWorkflowTemplate(task, options = {}) {
    const { complexity = 'medium', aiModel = 'default' } = options;
    
    // Define template structure based on task type
    let template = {
      title: `n8n Workflow Template for ${task}`,
      description: `A template for automating ${task} using n8n workflows`,
      nodes: [],
      connections: [],
      prompts: {}
    };
    
    // Determine workflow type based on task description
    if (task.toLowerCase().includes('data extraction') || task.toLowerCase().includes('scraping')) {
      template = this._generateDataExtractionTemplate(task, complexity, aiModel);
    } else if (task.toLowerCase().includes('content generation') || task.toLowerCase().includes('writing')) {
      template = this._generateContentGenerationTemplate(task, complexity, aiModel);
    } else if (task.toLowerCase().includes('monitoring') || task.toLowerCase().includes('alert')) {
      template = this._generateMonitoringTemplate(task, complexity, aiModel);
    } else if (task.toLowerCase().includes('social media') || task.toLowerCase().includes('posting')) {
      template = this._generateSocialMediaTemplate(task, complexity, aiModel);
    } else {
      template = this._generateGenericTemplate(task, complexity, aiModel);
    }
    
    return template;
  }
  
  /**
   * Generate a template for data extraction workflows
   * @private
   */
  static _generateDataExtractionTemplate(task, complexity, aiModel) {
    const template = {
      title: `Data Extraction Workflow for ${task}`,
      description: `An n8n workflow that extracts data from sources and processes it using AI`,
      nodes: [
        {
          name: 'HTTP Request',
          type: 'n8n-nodes-base.httpRequest',
          description: 'Fetch data from the target source'
        },
        {
          name: 'AI Processing',
          type: 'n8n-nodes-base.openAi',
          description: 'Process and extract structured data using AI'
        },
        {
          name: 'Data Transformation',
          type: 'n8n-nodes-base.function',
          description: 'Transform the extracted data into the required format'
        },
        {
          name: 'Data Storage',
          type: complexity === 'high' ? 'n8n-nodes-base.postgres' : 'n8n-nodes-base.googleSheets',
          description: 'Store the processed data'
        }
      ],
      connections: [
        { from: 'HTTP Request', to: 'AI Processing' },
        { from: 'AI Processing', to: 'Data Transformation' },
        { from: 'Data Transformation', to: 'Data Storage' }
      ],
      prompts: {
        aiProcessing: `You are a data extraction specialist. Extract the following information from the provided content:\n\n[List specific fields to extract]\n\nFormat the output as a valid JSON object with these fields. Ensure all extracted data is accurate and properly structured.`
      }
    };
    
    return template;
  }
  
  /**
   * Generate a template for content generation workflows
   * @private
   */
  static _generateContentGenerationTemplate(task, complexity, aiModel) {
    const template = {
      title: `Content Generation Workflow for ${task}`,
      description: `An n8n workflow that generates content using AI and distributes it`,
      nodes: [
        {
          name: 'Schedule Trigger',
          type: 'n8n-nodes-base.scheduleTrigger',
          description: 'Trigger the workflow on a schedule'
        },
        {
          name: 'Content Parameters',
          type: 'n8n-nodes-base.set',
          description: 'Set parameters for content generation'
        },
        {
          name: 'AI Content Generation',
          type: 'n8n-nodes-base.openAi',
          description: 'Generate content using AI'
        },
        {
          name: 'Content Formatting',
          type: 'n8n-nodes-base.function',
          description: 'Format the generated content'
        }
      ],
      connections: [
        { from: 'Schedule Trigger', to: 'Content Parameters' },
        { from: 'Content Parameters', to: 'AI Content Generation' },
        { from: 'AI Content Generation', to: 'Content Formatting' }
      ],
      prompts: {
        contentGeneration: `You are a content creation specialist for ${task}. Create engaging, informative content based on the following parameters:\n\nTopic: {{$node["Content Parameters"].json["topic"]}}\nTone: {{$node["Content Parameters"].json["tone"]}}\nLength: {{$node["Content Parameters"].json["length"]}}\n\nEnsure the content is original, well-structured, and optimized for the specified purpose.`
      }
    };
    
    // Add distribution nodes based on complexity
    if (complexity === 'high') {
      template.nodes.push(
        {
          name: 'Content Distribution',
          type: 'n8n-nodes-base.if',
          description: 'Determine distribution channels'
        },
        {
          name: 'Email Distribution',
          type: 'n8n-nodes-base.emailSend',
          description: 'Send content via email'
        },
        {
          name: 'Social Media Distribution',
          type: 'n8n-nodes-base.twitter',
          description: 'Post content to social media'
        }
      );
      
      template.connections.push(
        { from: 'Content Formatting', to: 'Content Distribution' },
        { from: 'Content Distribution', to: 'Email Distribution' },
        { from: 'Content Distribution', to: 'Social Media Distribution' }
      );
    } else {
      template.nodes.push({
        name: 'Email Distribution',
        type: 'n8n-nodes-base.emailSend',
        description: 'Send content via email'
      });
      
      template.connections.push({ from: 'Content Formatting', to: 'Email Distribution' });
    }
    
    return template;
  }
  
  /**
   * Generate a template for monitoring workflows
   * @private
   */
  static _generateMonitoringTemplate(task, complexity, aiModel) {
    const template = {
      title: `Monitoring Workflow for ${task}`,
      description: `An n8n workflow that monitors sources and sends alerts based on conditions`,
      nodes: [
        {
          name: 'Polling Trigger',
          type: 'n8n-nodes-base.polling',
          description: 'Poll the source at regular intervals'
        },
        {
          name: 'HTTP Request',
          type: 'n8n-nodes-base.httpRequest',
          description: 'Fetch data from the monitored source'
        },
        {
          name: 'Condition Check',
          type: 'n8n-nodes-base.if',
          description: 'Check if alert conditions are met'
        },
        {
          name: 'Alert Notification',
          type: 'n8n-nodes-base.emailSend',
          description: 'Send alert notification'
        }
      ],
      connections: [
        { from: 'Polling Trigger', to: 'HTTP Request' },
        { from: 'HTTP Request', to: 'Condition Check' },
        { from: 'Condition Check', to: 'Alert Notification' }
      ],
      prompts: {
        conditionCheck: `You are a monitoring specialist. Analyze the following data and determine if it meets the alert criteria:\n\n{{$json["data"]}}\n\nAlert Criteria:\n- [Specify alert conditions]\n\nReturn a boolean value (true/false) indicating whether an alert should be triggered, along with a brief explanation of why.`
      }
    };
    
    // Add AI analysis for high complexity
    if (complexity === 'high') {
      template.nodes.splice(2, 0, {
        name: 'AI Analysis',
        type: 'n8n-nodes-base.openAi',
        description: 'Analyze data using AI to detect anomalies'
      });
      
      template.connections = [
        { from: 'Polling Trigger', to: 'HTTP Request' },
        { from: 'HTTP Request', to: 'AI Analysis' },
        { from: 'AI Analysis', to: 'Condition Check' },
        { from: 'Condition Check', to: 'Alert Notification' }
      ];
      
      template.prompts.aiAnalysis = `You are an anomaly detection specialist. Analyze the following data and identify any anomalies or patterns that require attention:\n\n{{$json["data"]}}\n\nProvide a detailed analysis of any anomalies found, their potential impact, and recommended actions.`;
    }
    
    return template;
  }
  
  /**
   * Generate a template for social media workflows
   * @private
   */
  static _generateSocialMediaTemplate(task, complexity, aiModel) {
    const template = {
      title: `Social Media Workflow for ${task}`,
      description: `An n8n workflow that manages social media content and engagement`,
      nodes: [
        {
          name: 'Schedule Trigger',
          type: 'n8n-nodes-base.scheduleTrigger',
          description: 'Trigger the workflow on a schedule'
        },
        {
          name: 'Content Parameters',
          type: 'n8n-nodes-base.set',
          description: 'Set parameters for content generation'
        },
        {
          name: 'AI Content Generation',
          type: 'n8n-nodes-base.openAi',
          description: 'Generate social media content using AI'
        },
        {
          name: 'Platform Selection',
          type: 'n8n-nodes-base.switch',
          description: 'Select which social media platforms to post to'
        },
        {
          name: 'Twitter Post',
          type: 'n8n-nodes-base.twitter',
          description: 'Post content to Twitter'
        },
        {
          name: 'LinkedIn Post',
          type: 'n8n-nodes-base.linkedIn',
          description: 'Post content to LinkedIn'
        }
      ],
      connections: [
        { from: 'Schedule Trigger', to: 'Content Parameters' },
        { from: 'Content Parameters', to: 'AI Content Generation' },
        { from: 'AI Content Generation', to: 'Platform Selection' },
        { from: 'Platform Selection', to: 'Twitter Post' },
        { from: 'Platform Selection', to: 'LinkedIn Post' }
      ],
      prompts: {
        socialMediaContent: `You are a social media content specialist for ${task}. Create engaging, platform-optimized content based on the following parameters:\n\nTopic: {{$node["Content Parameters"].json["topic"]}}\nPlatform: {{$node["Platform Selection"].json["platform"]}}\nTone: {{$node["Content Parameters"].json["tone"]}}\n\nEnsure the content is attention-grabbing, concise, and optimized for the specified platform. Include relevant hashtags and call-to-action where appropriate.`
      }
    };
    
    // Add engagement monitoring for high complexity
    if (complexity === 'high') {
      template.nodes.push(
        {
          name: 'Engagement Monitoring',
          type: 'n8n-nodes-base.polling',
          description: 'Monitor engagement on posted content'
        },
        {
          name: 'Engagement Analysis',
          type: 'n8n-nodes-base.openAi',
          description: 'Analyze engagement using AI'
        },
        {
          name: 'Engagement Report',
          type: 'n8n-nodes-base.emailSend',
          description: 'Send engagement report'
        }
      );
      
      template.connections.push(
        { from: 'Twitter Post', to: 'Engagement Monitoring' },
        { from: 'LinkedIn Post', to: 'Engagement Monitoring' },
        { from: 'Engagement Monitoring', to: 'Engagement Analysis' },
        { from: 'Engagement Analysis', to: 'Engagement Report' }
      );
      
      template.prompts.engagementAnalysis = `You are a social media analytics specialist. Analyze the following engagement data and provide insights:\n\n{{$json["engagementData"]}}\n\nProvide a detailed analysis of engagement patterns, audience response, and recommendations for improving future content.`;
    }
    
    return template;
  }
  
  /**
   * Generate a generic template for other types of workflows
   * @private
   */
  static _generateGenericTemplate(task, complexity, aiModel) {
    const template = {
      title: `Workflow for ${task}`,
      description: `An n8n workflow that automates ${task}`,
      nodes: [
        {
          name: 'Trigger',
          type: 'n8n-nodes-base.scheduleTrigger',
          description: 'Trigger the workflow'
        },
        {
          name: 'Input Parameters',
          type: 'n8n-nodes-base.set',
          description: 'Set input parameters'
        },
        {
          name: 'AI Processing',
          type: 'n8n-nodes-base.openAi',
          description: 'Process data using AI'
        },
        {
          name: 'Data Processing',
          type: 'n8n-nodes-base.function',
          description: 'Process the data'
        },
        {
          name: 'Output',
          type: 'n8n-nodes-base.emailSend',
          description: 'Send the output'
        }
      ],
      connections: [
        { from: 'Trigger', to: 'Input Parameters' },
        { from: 'Input Parameters', to: 'AI Processing' },
        { from: 'AI Processing', to: 'Data Processing' },
        { from: 'Data Processing', to: 'Output' }
      ],
      prompts: {
        aiProcessing: `You are an automation specialist for ${task}. Process the following input and generate the appropriate output:\n\n{{$json["input"]}}\n\nEnsure the output is properly formatted and optimized for the specified task.`
      }
    };
    
    return template;
  }
  
  /**
   * Generate a prompt specifically for n8n workflow integration
   * @param {string} task - The task description
   * @param {Object} options - Additional options for prompt generation
   * @returns {Object} - The generated prompt
   */
  static generateN8nPrompt(task, options = {}) {
    const { complexity = 'medium', aiModel = 'default', workflowType = 'generic' } = options;
    
    let promptTemplate = '';
    
    // Base system prompt for n8n workflow integration
    promptTemplate = `You are an expert in n8n workflow automation and AI integration. Create a detailed prompt that will help the user build an n8n workflow for: ${task}.\n\n`;
    
    // Add workflow type specific instructions
    switch (workflowType) {
      case 'data-extraction':
        promptTemplate += 'Focus on extracting structured data from sources, processing it with AI, and storing or utilizing the results.\n\n';
        break;
      case 'content-generation':
        promptTemplate += 'Focus on generating content using AI, formatting it appropriately, and distributing it through various channels.\n\n';
        break;
      case 'monitoring':
        promptTemplate += 'Focus on monitoring data sources, analyzing the data for specific conditions or anomalies, and triggering appropriate actions.\n\n';
        break;
      case 'social-media':
        promptTemplate += 'Focus on creating and managing social media content, scheduling posts, and analyzing engagement.\n\n';
        break;
      default:
        promptTemplate += 'Provide a comprehensive workflow design that addresses the specific requirements of the task.\n\n';
    }
    
    // Add complexity-specific instructions
    if (complexity === 'high') {
      promptTemplate += 'Include advanced features such as error handling, conditional logic, data transformation, and integration with multiple services.\n\n';
    } else if (complexity === 'low') {
      promptTemplate += 'Keep the workflow simple and straightforward, focusing on the core functionality without complex logic or integrations.\n\n';
    } else {
      promptTemplate += 'Balance functionality and complexity, including necessary features while keeping the workflow manageable.\n\n';
    }
    
    // Add structure for the prompt
    promptTemplate += 'Your prompt should include:\n\n';
    promptTemplate += '1. A clear description of the workflow purpose and expected outcome\n';
    promptTemplate += '2. The required n8n nodes and their configuration\n';
    promptTemplate += '3. The connections between nodes and data flow\n';
    promptTemplate += '4. Any AI prompts needed for nodes that interact with AI services\n';
    promptTemplate += '5. Guidance on testing and troubleshooting the workflow\n\n';
    
    // Add AI model specific instructions if applicable
    if (aiModel !== 'default') {
      promptTemplate += `Optimize the AI interactions for the ${aiModel} model, leveraging its specific capabilities and features.\n\n`;
    }
    
    return {
      title: `n8n Workflow Prompt for ${task}`,
      content: promptTemplate,
      userType: 'agent',
      tags: ['n8n', 'workflow', 'automation', complexity, workflowType],
      recommendedModels: ['google/gemma-3-27b-it', 'deepseek-r1-zero'],
      useCase: task,
    };
  }
}

module.exports = N8nIntegration;