const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '2d' });
};


const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'User registered',
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error registering user',
      error: err.message,
    });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });


    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error logging in',
      error: err.message,
    });
  }
};

module.exports = { registerUser, loginUser };
