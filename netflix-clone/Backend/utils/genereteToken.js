import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: '15d' });

  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,  // 15 days in milliseconds
    httpOnly: true,                    // Prevents XSS attacks, makes cookie inaccessible by JS
    sameSite: "strict",                 // Protects against CSRF attacks
    secure: ENV_VARS.NODE_ENV !== "development"  // HTTPS only in production
  });

  return token;
};
