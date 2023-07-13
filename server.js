import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import authRouter from './routes/auth.js';
import jobsRouter from './routes/jobs.js';

dotenv.config();

const app = express();

// connect DB

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

// Start Server
const port = process.env.PORT;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();