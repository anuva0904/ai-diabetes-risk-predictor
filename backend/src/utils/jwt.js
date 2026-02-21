import jwt from "jsonwebtoken"
import ApiError  from './apiError.js'


// ======================================================
// Generate Access Token
// ======================================================
export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};


// ======================================================
// Generate Refresh Token
// ======================================================
export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};


// ======================================================
// Verify Access Token
// ======================================================
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired access token");
  }
};


// ======================================================
// Verify Refresh Token
// ======================================================
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }
};


