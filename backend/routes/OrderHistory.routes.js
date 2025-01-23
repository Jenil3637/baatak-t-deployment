import express from "express";
import {
  createOrderHistory,
  getOrderHistories,
  deleteOrderHistory,
  getTotalOrders,
  getAvgOrderValueInWeek,
  getTodayRevenue,
  getRecentOrdersOfTheDay,
  getPopularItemsRanking
} from "../controllers/OrderHistory.controller.js";

const router = express.Router();

// Route to create a new order history
router.post("/", createOrderHistory);

// Route to get all order histories
router.get("/orderHistories", getOrderHistories);

// Route to delete an order history by ID
router.delete("/orderHistories/:id", deleteOrderHistory);

router.get("/total-orders", getTotalOrders);

router.get("/avg-order-value-inweek", getAvgOrderValueInWeek);

router.get('/today-revenue', getTodayRevenue);

router.get('/recent-orders-today', getRecentOrdersOfTheDay);

router.get("/popular-items", getPopularItemsRanking); 
export default router;  