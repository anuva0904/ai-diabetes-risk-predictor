import mongoose from "mongoose";
import { adminSchema } from "./schemas/adminModel.js"
import { generateRandomToken, hashToken } from "../utils/token.js";


const userSchema = new mongoose.Schema(
  {
    // ==================================================
    // Basic Information
    // ==================================================
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // never return password in queries
    },

    role: {
      type: String,
      enum: ["Patient", "Admin"],
      default: "Patient",
    },

    // ==================================================
    // Conditional Admin Subdocument
    // ==================================================
    admin_info: {
      type: adminSchema,
      required: function () {
        return this.role === "Admin";
      },
    },

    // ==================================================
    // Security & Account Protection
    // ==================================================
    mfaEnabled: {
      type: Boolean,
      default: false,
    },

    emailVerified: {
      type: Boolean,
      default: false,
      index: true,
    },

    failedLoginAttempts: {
      type: Number,
      default: 0,
    },

    lockoutUntil: {
      type: Date,
      index: true,
    },

    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
    refreshToken:[{
        type: String,
        select:false,
    }],
    // ==================================================
    // Password Reset
    // ==================================================
    passwordResetToken: {
      type: String,
      select: false,
    },

    passwordResetExpiresAt: {
      type: Date,
      select: false,
    },

    passwordUpdatedAt: {
      type: Date,
    },

    // ==================================================
    // Email Verification
    // ==================================================
    emailVerificationToken: {
      type: String,
      select: false,
    },

    emailVerificationExpires: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
);

// ======================================================
// INDEXES
// ======================================================

// Soft-delete safe unique email
userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { deletedAt: null },
  }
);

// Recent users index
userSchema.index({ createdAt: -1 });

userSchema.methods.generatePasswordResetToken = function () {
  const rawToken = generateRandomToken();

  this.passwordResetToken = hashToken(rawToken);
  this.passwordResetExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  return rawToken; // send this in email
};

export const User = mongoose.model('User',userSchema)