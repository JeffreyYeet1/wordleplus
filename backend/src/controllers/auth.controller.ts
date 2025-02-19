// controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

// Interface for the request body during signup
interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
}

// Interface for the request body during login
interface LoginRequestBody {
  email: string;
  password: string;
}

// Signup logic
export const signup = async (req: Request, res: Response): Promise<void> => {
  console.log('Signup request received:', req.body); // Add this line
  const { username, email, password }: SignupRequestBody = req.body;

  try {
    // Check if user already exists
    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    // Create a new user
    const user: IUser = new User({ username, email });
    await user.hashPassword(password); // Hash the password
    await user.save();

    // Generate a JWT token
    const token: string = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(201).json({ message: 'User created', token });
  } catch (error: any) {
    console.error('Signup error: ', error);
    res.status(500).json({ error: error.message });
  }
};

// Login logic
export const login = async (req: Request, res: Response): Promise<void> => {
  console.log('Login request received:', req.body); // Log the request body
  const { email, password }: LoginRequestBody = req.body;

  try {
    // Find the user by email
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: 'User not found' });
      return;
    }

    // Validate the password
    const isValid: boolean = await user.validatePassword(password);
    if (!isValid) {
      res.status(400).json({ error: 'Invalid password' });
      return;
    }

    // Generate a JWT token
    const token: string = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error: any) {
    console.error('Login error: ', error);
    res.status(500).json({ error: error.message });
  }
};