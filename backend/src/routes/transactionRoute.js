import express from "express";
import ListTransactions from "../controllers/ListTransactions.js";
import GetStatistics from "../controllers/GetStatistics.js";
import GetPriceRangeStats from "../controllers/GetPriceRangeStats.js";
import GetCategoryStats from "../controllers/GetCategoryStats.js";


const router = express.Router();


router.get('/transactions', ListTransactions); 
router.get('/statistics', GetStatistics);
router.get('/price-range', GetPriceRangeStats);
router.get('/category-stats', GetCategoryStats);


export default router;