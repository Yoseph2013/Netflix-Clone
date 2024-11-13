// Package Import required modules
import express from 'express';
import cookieParser from 'cookie-parser';

// Route import
import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import tvRoutes from './routes/tv.route.js';
import searchRoutes from './routes/search.route.js';

// Config Import
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import { protectRoute } from './middleware/protectRoute.js';

// Initialize the Express application
const app = express();

// Define PORT and HOSTNAME from environment variables
const PORT = ENV_VARS.PORT;
const HOSTNAME = ENV_VARS.HOSTNAME;

// Middleware to parse JSON request bodies
app.use(express.json());   // Allows us to parse req.body for JSON data
app.use(cookieParser());

// Log the MongoDB URI for debugging (useful during development)
console.log('MONGO_URI:', ENV_VARS.MONGO_URI);

// Set up the authentication routes with a base path
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', protectRoute, movieRoutes);
app.use('/api/v1/tv', protectRoute, tvRoutes);
app.use('/api/v1/search', protectRoute, searchRoutes);

// Start the server and connect to the database
app.listen(PORT, () => {
  console.log(`Server is started at: ${HOSTNAME}:${PORT}`);
  connectDB();   // Connect to the database once the server starts
});
