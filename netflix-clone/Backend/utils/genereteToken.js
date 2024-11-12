import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie =  (userId, res) => {
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn: '15d'})

    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,  // 15 days 24 hours 60 minits 60 second and 1000 milisecond
        httpOnly: true, // prevents xss attacks cross-site scripting attacks,make it not accessable by JS
        sameSite: "strict", // CSRF attacks cross-site request forgery attack
        secure:ENV_VARS.NODE_ENV !=="development"
          // https only true but local host gonna be false
        
    });
    return token;
}