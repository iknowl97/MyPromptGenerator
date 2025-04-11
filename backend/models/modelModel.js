const mongoose = require('mongoose');

const modelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    provider: {
      type: String,
      required: true,
      trim: true,
    },
    modelId: {
      type: String,
      required: true,
      trim: true,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      required: false,
    },
    bestFor: {
      type: [String],
      default: [],
    },
    tokensPerSecond: {
      type: Number,
      required: false,
    },
    costPer1k: {
      type: Number,
      required: false,
    },
    documentationUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Model', modelSchema);