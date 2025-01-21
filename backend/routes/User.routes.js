import express from 'express';
import { createUser, deleteUser, editUser, getUsers } from '../controllers/User.controller.js';

const router = express.Router();

// Route to create a new user
router.post('/register', createUser);

// Route to get all users (optional)
router.get('/all', getUsers);

router.put('/edit/:id', editUser);

router.delete('/delete/:id', deleteUser);
export default router;
 