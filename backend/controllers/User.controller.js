import User from '../models/User.model.js';

// Controller to create a new user
export const createUser = async (req, res) => {
    try {
        const { username, phoneNumber, email } = req.body;

        // Treat empty email as null
        const validEmail = email === "" ? null : email;

        // Create a filter for checking duplicates
        const filter = { 
            $or: [{ username }, { phoneNumber }]
        };

        // Add email to the filter if provided (not null or empty string)
        if (validEmail) {
            filter.$or.push({ email: validEmail });
        }

        // Check if a user already exists with the same username, phone number, or email
        const existingUser = await User.findOne(filter);

        if (existingUser) {
            return res.status(400).json({ message: 'Username, phone number, or email already in use.' });
        }

        // Create new user
        const newUser = new User({
            username,
            phoneNumber,
            email: validEmail // Set email to null if empty string
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully!', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller to edit a user (update user details)
export const editUser = async (req, res) => {
    const { id } = req.params; // The user ID to update
    const { username, phoneNumber, email } = req.body; // New data for user

    try {
        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Treat empty email as null
        const validEmail = email === "" ? null : email;

        // Create a filter for checking duplicates, excluding the current user
        const filter = { 
            $or: [{ username }, { phoneNumber }]
        };

        // Add email to the filter if provided (not null or empty string), and exclude the current user
        if (validEmail) {
            filter.$or.push({ email: validEmail });
        }

        // Check if the updated username, phone number, or email already exists (except for the current user)
        const existingUser = await User.findOne({
            ...filter,
            _id: { $ne: id } // Exclude the current user from the check
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username, phone number, or email already in use.' });
        }

        // Update user details
        user.username = username || user.username;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.email = validEmail || user.email;

        await user.save();

        res.status(200).json({ message: 'User updated successfully!', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller to delete a user
export const deleteUser = async (req, res) => {
    const { id } = req.params; // The user ID to delete

    try {
        // Find and delete the user by ID
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
