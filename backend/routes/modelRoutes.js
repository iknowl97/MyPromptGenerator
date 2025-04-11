const express = require('express');
const router = express.Router();
const Model = require('../models/modelModel');

// @desc    Get all models
// @route   GET /api/models
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { provider, isFree, isAvailable } = req.query;
    const filter = {};
    
    if (provider) filter.provider = provider;
    if (isFree !== undefined) filter.isFree = isFree === 'true';
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';
    
    const models = await Model.find(filter).sort({ name: 1 });
    res.json(models);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get model by ID
// @route   GET /api/models/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    
    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }
    
    res.json(model);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Model not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create a model
// @route   POST /api/models
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { 
      name, 
      provider, 
      modelId, 
      isFree, 
      isAvailable, 
      description, 
      bestFor, 
      tokensPerSecond, 
      costPer1k, 
      documentationUrl 
    } = req.body;
    
    // Check if model already exists
    const modelExists = await Model.findOne({ modelId });
    if (modelExists) {
      return res.status(400).json({ message: 'Model already exists' });
    }
    
    const newModel = new Model({
      name,
      provider,
      modelId,
      isFree,
      isAvailable,
      description,
      bestFor,
      tokensPerSecond,
      costPer1k,
      documentationUrl,
    });
    
    const savedModel = await newModel.save();
    res.status(201).json(savedModel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Update a model
// @route   PUT /api/models/:id
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { 
      name, 
      provider, 
      modelId, 
      isFree, 
      isAvailable, 
      description, 
      bestFor, 
      tokensPerSecond, 
      costPer1k, 
      documentationUrl 
    } = req.body;
    
    const modelFields = {};
    if (name !== undefined) modelFields.name = name;
    if (provider !== undefined) modelFields.provider = provider;
    if (modelId !== undefined) modelFields.modelId = modelId;
    if (isFree !== undefined) modelFields.isFree = isFree;
    if (isAvailable !== undefined) modelFields.isAvailable = isAvailable;
    if (description !== undefined) modelFields.description = description;
    if (bestFor !== undefined) modelFields.bestFor = bestFor;
    if (tokensPerSecond !== undefined) modelFields.tokensPerSecond = tokensPerSecond;
    if (costPer1k !== undefined) modelFields.costPer1k = costPer1k;
    if (documentationUrl !== undefined) modelFields.documentationUrl = documentationUrl;
    
    let model = await Model.findById(req.params.id);
    
    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }
    
    model = await Model.findByIdAndUpdate(
      req.params.id,
      { $set: modelFields },
      { new: true }
    );
    
    res.json(model);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Model not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete a model
// @route   DELETE /api/models/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    
    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }
    
    await model.deleteOne();
    
    res.json({ message: 'Model removed' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Model not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get recommended models for a specific user type
// @route   GET /api/models/recommend/:userType
// @access  Public
router.get('/recommend/:userType', async (req, res) => {
  try {
    const { userType } = req.params;
    const { complexity } = req.query;
    
    let filter = { isAvailable: true };
    
    // Define model recommendations based on user type and complexity
    if (userType === 'agent') {
      filter.bestFor = { $in: ['agent-development', 'n8n', 'workflow-automation'] };
    } else if (userType === 'content') {
      filter.bestFor = { $in: ['content-creation', 'writing', 'creative'] };
    } else if (userType === 'casual') {
      filter.bestFor = { $in: ['general-purpose', 'chat', 'everyday'] };
    }
    
    // If complexity is specified, adjust recommendations
    if (complexity === 'high') {
      // For high complexity, prefer more powerful models
      filter.tokensPerSecond = { $gte: 40 };
    } else if (complexity === 'low') {
      // For low complexity, prefer faster, potentially free models
      filter.isFree = true;
    }
    
    const recommendedModels = await Model.find(filter).sort({ isFree: -1, tokensPerSecond: -1 }).limit(5);
    
    res.json(recommendedModels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;