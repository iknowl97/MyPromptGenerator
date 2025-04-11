const mongoose = require('mongoose');

const promptSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
      enum: ['casual', 'content', 'agent'],
      default: 'casual',
    },
    tags: {
      type: [String],
      default: [],
    },
    recommendedModels: {
      type: [String],
      default: [],
    },
    useCase: {
      type: String,
      required: false,
    },
    isTemplate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Prompt', promptSchema);