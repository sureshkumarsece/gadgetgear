

import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cartRoutes from './routes/cartRoutes.js';
import connectDB from './config/db.js';
import orderRoutes from './routes/orderRoutes.js';

const cors = require('cors');
const express = require('express');

dotenv.config();
const app = express();
app.use(express.json());


app.use(cors({
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));


// Connect to the database
connectDB();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
  }, { timestamps: true }); 
  

const User = mongoose.model('User', userSchema);

// Routes
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Signup Route
app.post('/signup', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
  
      // Save user to database
      await user.save();
  
      // Generate JWT Token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ token, user: { name: user.name, email: user.email } });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  });
  

// Login Route
app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        console.log('User not found');
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
      if (!isPasswordCorrect) {
        console.log('Incorrect password');
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT Token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      console.log('Login successful, returning token');
      res.json({ token, user: { name: user.name, email: user.email } });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  });
  

// Start the server
app.listen(5000, () => console.log('Server running on port 5000'));
