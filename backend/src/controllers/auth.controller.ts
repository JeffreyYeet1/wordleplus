// const User = require('../models/user.model');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// import { Request, Response } from 'express'; // Import types from express

// // Register a new user
// exports.register = async (req: Request, res: Response) => {
//   try {
//     const { username, email, password } = req.body;
    
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Email is already in use' });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ username, email, passwordHash: hashedPassword });

//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error registering user' });
//   }
// };

// // Login an existing user
// exports.login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Compare the provided password with the hashed password
//     const isMatch = await bcrypt.compare(password, user.passwordHash);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     // Generate a JWT token for authentication
//     const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

//     // Send the token as a response
//     res.json({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error logging in user' });
//   }
// };
