import mongoose from "mongoose";

export const adminSchema = new mongoose.Schema(
  {
    adminId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    department: {
      type: String,
      trim: true,
    },

    permissions: [
      {
        type: String,
        enum: [
          "MANAGE_USERS",
          "VIEW_ANALYTICS",
          "MANAGE_PREDICTIONS",
          "SYSTEM_SETTINGS",
        ],
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    lastLoginAt: {
      type: Date,
    },
  },
  { _id: false } // Important: prevents separate _id for subdocument
);