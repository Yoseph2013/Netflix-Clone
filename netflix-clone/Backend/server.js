// Import required modules
import express from 'express';

import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';

import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

// Initialize the Express application
const app = express();

// Define PORT and HOSTNAME from environment variables
const PORT = ENV_VARS.PORT;
const HOSTNAME = ENV_VARS.HOSTNAME;

// Middleware to parse JSON request bodies
app.use(express.json());   // Allows us to parse req.body for JSON data

// Log the MongoDB URI for debugging (useful during development)
console.log('MONGO_URI: ', ENV_VARS.MONGO_URI);

// Set up the authentication routes with a base path
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', movieRoutes);

// Start the server and connect to the database
app.listen(PORT, () => {
    console.log(`Server is started at : ${HOSTNAME}:${PORT}`);
    connectDB();   // Connect to the database once the server starts
});


