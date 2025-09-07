const User = require('../models/User');
const fs = require('fs');
const path = require('path');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create user
const createUser = async (req, res) => {
  try {
    const { name, phone, email, location, designation, note, role, features } = req.body;
    
    let avatar = '';
    if (req.file) {
      avatar = `/uploads/${req.file.filename}`;
    }
    
    // Convert designation to array if it's a string
    const designationArray = Array.isArray(designation) ? designation : [designation];
    
    const user = new User({
      name,
      phone,
      email,
      location,
      designation: designationArray,
      note,
      avatar,
      role,
      features: Array.isArray(features) ? features : [features]
    });
    
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { name, phone, email, location, designation, note, role, features, status } = req.body;
    
    const updateData = {
      name,
      phone,
      email,
      location,
      designation: Array.isArray(designation) ? designation : [designation],
      note,
      role,
      features: Array.isArray(features) ? features : [features],
      status
    };
    
    if (req.file) {
      // Remove old avatar if exists
      const user = await User.findById(req.params.id);
      if (user.avatar && fs.existsSync(user.avatar)) {
        fs.unlinkSync(user.avatar);
      }
      updateData.avatar = `/uploads/${req.file.filename}`;
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Remove avatar file if exists
    if (user.avatar && fs.existsSync(user.avatar)) {
      fs.unlinkSync(user.avatar);
    }
    
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};