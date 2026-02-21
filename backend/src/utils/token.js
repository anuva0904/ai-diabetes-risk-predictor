import { randomBytes, createHash } from "crypto";


// ======================================================
// Generate Secure Random Token
// ======================================================
export const generateRandomToken = () => {
  return randomBytes(32).toString("hex");
};


// ======================================================
// Hash Token (SHA256)
// ======================================================
export const hashToken = (token) => {
  return createHash("sha256")
    .update(token)
    .digest("hex");
};
