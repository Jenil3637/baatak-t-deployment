import express from 'express';
import { createUser, getUsers } from '../controllers/User.controller.js';

const router = express.Router();

// Route to create a new user
router.post('/register', createUser);

// Route to get all users (optional)
router.get('/all', getUsers);

export default router;
 