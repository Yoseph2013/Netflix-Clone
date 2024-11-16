import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/genereteToken.js';

// Signup function to create a new user
export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png", "/avatar4.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image
    });

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);

    const { password: _, ...userData } = newUser._doc;
    res.status(201).json({
      success: true,
      user: userData
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Login function to authenticate the user
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res);

    const { password: _, ...userData } = user._doc;
    res.status(200).json({
      success: true,
      user: userData
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Logout function to log the user out
export async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export async function authCheck(req, res) {

  try{
      res.status(200).json({success: true, user: req.user})

  }catch (error) {
    console.log("Error in authCheck controller", error.message);
    res.status(500).json({success: false,  message: "Internal server error"})

  }
}
