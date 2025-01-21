import multer from 'multer';
import MenuItem from '../models/MenuItems.model.js';
import cloudinary from 'cloudinary';
import path from 'path';
import dotenv from 'dotenv';
// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });  // Adjust path if needed

// Configure Cloudinary using environment variables
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,  // Cloudinary cloud_name from .env
  api_key: process.env.API_KEY,        // Cloudinary api_key from .env
  api_secret: process.env.API_SECRET,  // Cloudinary api_secret from .env
});


// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store uploaded images
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
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create menu item.' });
  }
};

// Middleware to handle image upload (should be used in routes)
export const uploadImage = upload.single('image'); // 'image' is the field name in the formData

export const getAllMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (error) {
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
    console.error(error);
    res.status(500).json({ error: 'Failed to update menu item.' });
  }
};

// backend/controllers/Menu.controller.js
// backend/controllers/Menu.controller.js
export const deleteMenuItem = async (req, res) => {
    try {
      const { id } = req.params;
      const item = await MenuItem.findByIdAndDelete(id);
      if (!item) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete item' });
    }
  };
  