import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';

dotenv.config();

const app = express();

// Start Server
const port = process.env.PORT;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();