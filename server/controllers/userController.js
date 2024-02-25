const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/User');

const usersController = {
  register: async (req, res) => {
    try {
      const { username, name, password } = req.body;

      // Check if the username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already in use' });
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        name,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      // Check if the user exists
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Check if the provided password matches the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Generate a JWT token for authentication
      // const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

      // Log the user in and send the token (you might store the token in a cookie or client-side storage)
      res.json({ message: 'Login successful', token: 'token' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  logout: (req, res) => {
    // TODO: Perform logout actions (e.g., destroy session, revoke tokens)

    res.json({ message: 'Logout successful' });
  },

  resetPassword: async (req, res) => {
    // TODO: Implement password reset logic here

    res.json({ message: 'Password reset initiated' });
  },

  get: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Validate if userId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }

      const user = await User.findById(userId);

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  findOrCreateByName: async (req, res) => {
    try {
      const userName = req.params.userName;

      // Validate if userName is provided
      if (!userName) {
        return res.status(400).json({ error: 'User name is required' });
      }

      // Find or create user by name
      const user = await User.findOneAndUpdate(
        { username: userName },
        { $setOnInsert: { username: userName } },
        { new: true, upsert: true }
      );

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  delete: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user.id);
      await Score.deleteMany({ user: req.user.id }); // Delete associated scores

      res.json({ message: 'Account deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = usersController;
