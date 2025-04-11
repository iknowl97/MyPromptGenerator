const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Prompt = require('../models/promptModel');

// @desc    Get all prompts
// @route   GET /api/prompts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { userType, tags, isTemplate } = req.query;
    const filter = {};
    
    if (userType) filter.userType = userType;
    if (tags) filter.tags = { $in: tags.split(',') };
    if (isTemplate !== undefined) filter.isTemplate = isTemplate === 'true';
    
    const prompts = await Prompt.find(filter).sort({ createdAt: -1 });
    res.json(prompts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get prompt by ID
// @route   GET /api/prompts/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);
    
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    
    res.json(prompt);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create a prompt
// @route   POST /api/prompts
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { title, content, userType, tags, recommendedModels, useCase, isTemplate } = req.body;
    
    const newPrompt = new Prompt({
      title,
      content,
      userType,
      tags,
      recommendedModels,
      useCase,
      isTemplate,
    });
    
    const savedPrompt = await newPrompt.save();
    res.status(201).json(savedPrompt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Update a prompt
// @route   PUT /api/prompts/:id
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { title, content, userType, tags, recommendedModels, useCase, isTemplate } = req.body;
    
    const promptFields = {};
    if (title !== undefined) promptFields.title = title;
    if (content !== undefined) promptFields.content = content;
    if (userType !== undefined) promptFields.userType = userType;
    if (tags !== undefined) promptFields.tags = tags;
    if (recommendedModels !== undefined) promptFields.recommendedModels = recommendedModels;
    if (useCase !== undefined) promptFields.useCase = useCase;
    if (isTemplate !== undefined) promptFields.isTemplate = isTemplate;
    
    let prompt = await Prompt.findById(req.params.id);
    
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    
    prompt = await Prompt.findByIdAndUpdate(
      req.params.id,
      { $set: promptFields },
      { new: true }
    );
    
    res.json(prompt);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete a prompt
// @route   DELETE /api/prompts/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);
    
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    
    await prompt.deleteOne();
    
    res.json({ message: 'Prompt removed' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Generate a prompt using OpenRouter API
// @route   POST /api/prompts/generate
// @access  Public
router.post('/generate', async (req, res) => {
  try {
    const { userType, task, tone, complexity, n8nIntegration } = req.body;
    
    // In a real implementation, this would call the OpenRouter API
    // For now, we'll return a mock response
    const generatedPrompt = {
      title: `Generated Prompt for ${task}`,
      content: `You are an AI assistant helping with ${task}. ${n8nIntegration ? 'This prompt is optimized for n8n workflow integration.' : ''} Please provide a detailed response with a ${tone} tone.`,
      userType,
      tags: [userType, tone, complexity],
      recommendedModels: userType === 'agent' 
        ? ['google/gemma-3-27b-it', 'deepseek-r1-zero'] 
        : ['gemini-2.0-flash', 'deepseek-chat-v3'],
      useCase: task,
      isTemplate: false,
    };
    
    res.json(generatedPrompt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;