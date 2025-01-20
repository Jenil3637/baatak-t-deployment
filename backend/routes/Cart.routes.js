import express from 'express';
import CartController from '../controllers/Cart.controller.js';

const router = express.Router();

// Route to create a new cart
router.post('/cart', CartController.createCart);

// Route to get all carts
router.get('/carts', CartController.getAllCarts);

// Route to get a cart by user name
router.get('/cart/:user', CartController.getCartByUser);
 
// Route to delete a specific cart
router.delete('/carts/:cartId', CartController.deleteCart);

// Route to move a cart to order history
router.delete('/carts/move-to-history/:cartId', CartController.moveToOrderHistoryById);

export default router;
