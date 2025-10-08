import OrderHistory from "../models/OrderHistory.model.js";
import moment from "moment";

// Controller to create a new order history
export const createOrderHistory = async (req, res) => {
  const { user, phoneNumber, items, totalQuantity, totalPrice } = req.body;

  try {
    const newOrderHistory = new OrderHistory({
      user,
      phoneNumber,
      items,
      totalQuantity,
      totalPrice,
    });

    const savedOrderHistory = await newOrderHistory.save();
    res.status(201).json(savedOrderHistory); // 201 for created successfully
  } catch (error) {
    res.status(500).json({ message: "Error creating order history", error });
  }
};

// Controller to get all order histories
export const getOrderHistories = async (req, res) => {
  try {
    const orderHistories = await OrderHistory.find();
    res.status(200).json(orderHistories); // 200 for successful response
  } catch (error) {
    res.status(500).json({ message: "Error fetching order histories", error });
  }
};

// Controller to delete an order history by ID
export const deleteOrderHistory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrderHistory = await OrderHistory.findByIdAndDelete(id);

    if (!deletedOrderHistory) {
      return res.status(404).json({ message: "Order history not found" }); // 404 if not found
    }
    res.status(200).json({ message: "Order history deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order history", error });
  }
};


export const getTotalOrders = async (req, res) => {
  try {
    // Fetch the total number of orders
    const totalOrders = await OrderHistory.countDocuments();
    res.status(200).json({ totalOrders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total orders", error });
  }
};

export const getAvgOrderValueInWeek = async (req, res) => {
  try {
    // Filter orders from the last 7 days
    const oneWeekAgo = moment().subtract(7, "days").toDate();
    const recentOrders = await OrderHistory.find({
      createdAt: { $gte: oneWeekAgo },
    });

    // Calculate the total revenue from these orders
    const totalRevenueLastWeek = recentOrders.reduce((sum, order) => sum + order.totalPrice, 0);

    // Calculate average order value for the last week
    const avgOrderValueLastWeek = recentOrders.length > 0
      ? totalRevenueLastWeek / recentOrders.length
      : 0;

    res.status(200).json({ avgOrderValueLastWeek: avgOrderValueLastWeek.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: "Error fetching average order value", error });
  }
};

export const getTodayRevenue = async (req, res) => {
  try {
    // Get the start and end of today's date
    const startOfDay = moment().startOf('day').toDate();
    const endOfDay = moment().endOf('day').toDate();

    // Filter orders created today
    const ordersToday = await OrderHistory.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    // Calculate total revenue for today
    const totalRevenueToday = ordersToday.reduce((sum, order) => sum + order.totalPrice, 0);

    res.status(200).json({ totalRevenueToday: totalRevenueToday.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: "Error fetching today's revenue", error });
  }
};

export const getRecentOrdersOfTheDay = async (req, res) => {
  try {
    // Get the start and end of today's date
    const startOfDay = moment().startOf('day').toDate();
    const endOfDay = moment().endOf('day').toDate();

    // Filter orders created today, sorted by most recent
    const recentOrdersToday = await OrderHistory.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ createdAt: -1 }); // Sort by createdAt in descending order (most recent first)

    res.status(200).json(recentOrdersToday);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recent orders of the day", error });
  }
};


// Controller to get popular items ranking
export const getPopularItemsRanking = async (req, res) => {
  try {
    // Fetch all order histories
    const orderHistories = await OrderHistory.find();

    // Create an object to store the total quantity and total revenue for each item
    const itemData = {};

    // Loop through each order and each item to update the quantity and total revenue
    orderHistories.forEach(order => {
      order.items.forEach(item => {
        // If the item already exists in the object, update its quantity and revenue
        if (itemData[item.name]) {
          itemData[item.name].quantity += item.quantity;
          itemData[item.name].totalRevenue += item.price * item.quantity; // Assuming 'price' is in item
        } else {
          itemData[item.name] = {
            quantity: item.quantity,
            totalRevenue: item.price * item.quantity, // Assuming 'price' is in item
          };
        }
      });
    });

    // Create an array from the itemData object to sort by total revenue in descending order
    const sortedItems = Object.keys(itemData)
      .map(itemName => ({
        name: itemName,
        quantity: itemData[itemName].quantity,
        totalRevenue: itemData[itemName].totalRevenue.toFixed(2), // Format revenue to 2 decimals
      }))
      .sort((a, b) => b.totalRevenue - a.totalRevenue); // Sort by total revenue in descending order

    res.status(200).json(sortedItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching popular items ranking", error });
  }
};