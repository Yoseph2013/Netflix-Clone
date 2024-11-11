import express from 'express';   
import authRoutes from './routes/auth.route.js';
import { ENV_VARS } from './config/envVars.js';

const app = express();
const PORT = ENV_VARS.PORT;

console.log('MONGO_URI: ', ENV_VARS.MONGO_URI);

app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is started at http://localhost:` + PORT);
});
