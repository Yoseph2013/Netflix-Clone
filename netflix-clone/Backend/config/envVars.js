import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARS = {
  PORT: process.env.PORT || 5000, // Default to 5000 if PORT is not set in .env
  MONGO_URI: process.env.MONGO_URI,
  HOSTNAME: process.env.HOSTNAME,
  JWT_SECRET  : process.env.JWT_SECRET ,
  NODE_ENV: process.env.NODE_ENV,
  TMDB_API_KEY: process.env.TMDB_API_KEY
};
