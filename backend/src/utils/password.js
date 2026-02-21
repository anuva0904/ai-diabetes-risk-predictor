import bcrypt from "bcrypt";

// ======================================================
// Hash Password
// ======================================================
export const generateHashedPassword =(password) => {
  return bcrypt.hash(password, 12);
};

// ======================================================
// Compare Password
// ======================================================
export const comparePassword =(enteredPassword, hashedPassword) => {
  return bcrypt.compare(enteredPassword, hashedPassword);
};
