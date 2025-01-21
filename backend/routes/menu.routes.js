// routes/menuRoutes.js
import express from 'express';
import multer from 'multer';
import { 
  getAllMenuItems, 
  createMenuItem, 
  updateMenuItem, 
  deleteMenuItem 
} from '../controllers/Menu.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Middleware for file uploads

router.get('/menuItems', getAllMenuItems);
router.post('/menu', upload.single('image'), createMenuItem);
router.put('/menu/edit/:id', updateMenuItem);
router.delete('/menu/delete/:id', deleteMenuItem);

export default router;
 