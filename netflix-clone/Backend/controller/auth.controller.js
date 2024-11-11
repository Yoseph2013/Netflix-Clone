import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

// Signup function to create a new user
export async function signup(req, res) {
  try {
    // Extract email, password, and username from the request body
    const { email, password, username } = req.body;

    // Check if all required fields are provided
    if (!email || !password || !username) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    // Check if password meets minimum length requirement
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    // Check if email already exists in the database
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Check if username already exists in the database
    const existingUserByUserName = await User.findOne({ username: username });
    if (existingUserByUserName) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
 

    // Generate salt and hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Define an array of profile pictures and select one randomly
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png", "/avatar4.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    // Create a new user instance with provided data and selected profile picture
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image
    });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: ""
      }
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Login function to authenticate the user
export async function login(req, res) {
  try {
    // Logic for user login will go here
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Logout function to log the user out
export async function logout(req, res) {
  try {
    // Logic for user logout will go here
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
