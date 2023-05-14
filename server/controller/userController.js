const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user with email already exists
  const userExists = await User.findOne({ email :email });
  
  if (userExists) {
    return res.status(400).json({ message: 'Email is already registered' });
  }

  // Hash password
  // const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    
    return res.status(400).json({ message: 'Error registering user' });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email: email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Return token and user info
    return res.status(200).json({ token, user: { name: user.username, email: user.email , id:user._id } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};




module.exports = { register, signin };