// Import required modules
import express from 'express';
import authRoutes from './routes/auth.route.js';
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

// Start the server and connect to the database
app.listen(PORT, () => {
    console.log(`Server is started at : ${HOSTNAME}:${PORT}`);
    connectDB();   // Connect to the database once the server starts
});


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTIwOGZiNzUyMDI0MDMwNDE4YjMwNGY1YWJjMjI4NiIsIm5iZiI6MTczMTM3OTA1Ni41MzIwNDEzLCJzdWIiOiI2NzJmYmI3MmFjOTcwYWFkMmE4ZDgwMWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.V-aJHKzsbY-zOck4QvPvKhlqisyrQCy0P5hdyXYaer0'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));