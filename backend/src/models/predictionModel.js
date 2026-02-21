import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    // ==================================================
    // User Reference
    // ==================================================
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // ==================================================
    // Input Features (Health Parameters)
    // ==================================================
    glucose: {
      type: Number,
      required: true,
      min: 0,
    },

    bloodPressure: {
      type: Number,
      required: true,
      min: 0,
    },

    bmi: {
      type: Number,
      required: true,
      min: 0,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
    },

    pregnancies: {
      type: Number,
      required: true,
      min: 0,
    },

    // ==================================================
    // ML Output
    // ==================================================
    riskScore: {
      type: Number,
      required: true, // 0–1 probability
      min: 0,
      max: 1,
    },

    riskPercentage: {
      type: Number,
      required: true, // 0–100
      min: 0,
      max: 100,
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
      index: true,
    },

    modelVersion: {
      type: String,
      required: true,
      default: "v1",
    },

    // ==================================================
    // Metadata
    // ==================================================
    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);



// ======================================================
// INDEXES
// ======================================================

// User + createdAt index (for history queries)
predictionSchema.index({ user: 1, createdAt: -1 });

// Soft delete filter support
predictionSchema.index(
  { _id: 1 },
  { partialFilterExpression: { deletedAt: null } }
);



// ======================================================
// EXPORT MODEL
// ======================================================

export const Prediction = mongoose.model("Prediction", predictionSchema);