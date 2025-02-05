import express from "express";
import connectDB from "./config/db.js";
import './config/dotenv.config.js'
import seedDatabase from "./utils/seedDatabase.js";
import transactionRoutes from './routes/transactionController.js'

connectDB();
seedDatabase();

const app = express();

app.use(express.json());

app.use('/api',transactionRoutes)

export default app;
