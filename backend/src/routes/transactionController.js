import express from "express";
import ListTransactions from "../controllers/ListTransactions.js";

const router = express.Router();


router.get('/transactions', ListTransactions); 


export default router;