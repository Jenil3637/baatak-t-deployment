import User from '../models/User.model.js';

// Controller to create a new user
export const createUser = async (req, res) => {
    try {
        const { username, phoneNumber, email } = req.body;

        // Check if a user already exists with the same username, phone number, or email
        const existingUser = await User.findOne({
            $or: [{ username }, { phoneNumber }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username, phone number, or email already in use.' });
        }

        // Create new user
        const newUser = new User({
            username,
            phoneNumber,
            email
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully!', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller to get all users (optional)
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
