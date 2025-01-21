import Cart from '../models/Cart.model.js';  // Import the Cart model
import OrderHistory from '../models/OrderHistory.model.js';  // Import the OrderHistory model
import User from '../models/User.model.js'; // Import the User model

const CartController = {
    // Create a new cart

    createCart: async (req, res) => {
        try {
            console.log('Request Body:', req.body);
            const { user, phoneNumber, items, totalQuantity, totalPrice } = req.body;
    
            if (!user || user.trim() === '') {
                return res.status(400).json({ message: 'User name is required' });
            }
            if (!phoneNumber || phoneNumber.trim() === '') {
                return res.status(400).json({ message: 'Phone number is required' });
            }
    
            // Check if the user exists in the User model
            let existingUser = await User.findOne({ username: user, phoneNumber });
    
            if (!existingUser) {
                // Create a new user if it doesn't exist
                existingUser = new User({
                    username: user,
                    phoneNumber,
                });
                await existingUser.save();
            } else {
                // Optionally, update the user's phone number if needed
                existingUser.phoneNumber = phoneNumber;
                await existingUser.save();
            }
    
            // Create a new cart
            const newCart = new Cart({ user, phoneNumber, items, totalQuantity, totalPrice });
            await newCart.save();
    
            newCart.createdAt = new Date();
            await newCart.save();
    
            res.status(201).json({ message: 'Cart created successfully and user saved/updated', cart: newCart });
        } catch (error) {
            res.status(500).json({ message: 'Error creating cart', error: error.message });
        }
    },
    

    // Get all carts
    getAllCarts: async (req, res) => {
        try {
            const carts = await Cart.find();
            res.status(200).json({ carts });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching carts', error: error.message });
        }
    },

    // Get a single cart by user name
    getCartByUser: async (req, res) => {
        try {
            const { user } = req.params;
            const cart = await Cart.findOne({ user });

            if (!cart) {
                return res.status(404).json({ message: 'Cart not found for this user' });
            }

            res.status(200).json({ cart });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching cart', error: error.message });
        }
    },

    // Move the cart data to order history and remove the cart
    moveToOrderHistory: async (cart) => {
        try {
            const newOrder = new OrderHistory({
                user: cart.user,
                phoneNumber: cart.phoneNumber,
                items: cart.items,
                totalQuantity: cart.totalQuantity,
                totalPrice: cart.totalPrice,
            });

            await newOrder.save(); // Save order to history
            await Cart.deleteOne({ _id: cart._id }); // Remove the cart after saving to order history
        } catch (error) {
            console.log('Error moving cart to order history:', error.message);
        }
    },

    // Expire carts older than 1 minute (for testing)
    expireCart: async () => {
        try {
            const expirationTime = new Date(Date.now() - 5 * 60 * 1000); // 1 minute for testing

            const expiredCarts = await Cart.find({ createdAt: { $lt: expirationTime } });
            for (const cart of expiredCarts) {
                await CartController.moveToOrderHistory(cart);
            }

            await Cart.deleteMany({ createdAt: { $lt: expirationTime } });

            console.log('Expired carts removed and moved to order history successfully');
        } catch (error) {
            console.log('Error expiring carts:', error.message);
        }
    },

    // Delete a specific cart
    deleteCart: async (req, res) => {
        try {
            const { cartId } = req.params; // Extract cartId from the URL params

            // Check if the cart exists
            const cart = await Cart.findById(cartId);

            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            // Delete the cart
            await Cart.deleteOne({ _id: cartId });

            res.status(200).json({ message: 'Cart deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting cart', error: error.message });
        }
    },

    moveToOrderHistoryById: async (req, res) => {
        try {
            const { cartId } = req.params;
    
            // Find the cart by ID
            const cart = await Cart.findById(cartId);
    
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
    
            // Create a new order in the OrderHistory collection
            const newOrder = new OrderHistory({
                user: cart.user,
                phoneNumber: cart.phoneNumber,
                items: cart.items,
                totalQuantity: cart.totalQuantity,
                totalPrice: cart.totalPrice,
            });
    
            await newOrder.save(); // Save order to history
    
            // Delete the cart after saving to order history
            await Cart.deleteOne({ _id: cartId });
    
            res.status(200).json({ message: 'Order moved to order history and deleted from real-time orders' });
        } catch (error) {
            res.status(500).json({ message: 'Error moving order to history', error: error.message });
        }
    },
    
};

// Set interval to expire carts every minute
setInterval(CartController.expireCart, 60 * 1000);

export default CartController;
