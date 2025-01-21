import multer from 'multer';
import MenuItem from '../models/MenuItems.model.js';
import cloudinary from 'cloudinary';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables without specifying the path (assuming .env is in the root)
dotenv.config();

// console.log('CLOUD_NAME:', process.env.CLOUD_NAME);  // Should print 'dfgadbqq1'
// console.log('API_KEY:', process.env.API_KEY);        // Should print your API key
// console.log('API_SECRET:', process.env.API_SECRET);  // Should print your API secret

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir); // Folder to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept only image files
  } else {
    cb(new Error('Invalid file type, only images are allowed!'), false); // Reject non-image files
  }
};

const upload = multer({ storage, fileFilter });

// Use this upload middleware for handling image file uploads
export const createMenuItem = async (req, res) => {
  const { name, description, price, category } = req.body;

  // Check if image file is uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required.' });
  }

  const file = req.file;

  try {
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.v2.uploader.upload(file.path);

    // Create new MenuItem
    const newItem = new MenuItem({
      name,
      description,
      price,
      category,
      imageUrl: uploadResult.secure_url,  // Store the Cloudinary URL for the image
    });

    await newItem.save();
    // Delete the local file after upload to Cloudinary
    fs.unlinkSync(file.path);

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ error: 'Failed to create menu item', details: error.message });
  }
};

// Middleware to handle image upload (should be used in routes)
export const uploadImage = upload.single('image'); // 'image' is the field name in the formData

export const getAllMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Failed to fetch menu items.' });
  }
};

export const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;

  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      id,
      { name, description, price, category },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ error: 'Failed to update menu item.' });
  }
};

// Delete Menu Item
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ message: 'Failed to delete item' });
  }
};
