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

interface AuthenticatedRequest extends Request {
  user?: { id: string; username: string; email: string }; // Customize as needed
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
  console.log('Login request received:', req.body.email); // Log the request body
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


// Profile data logic
export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  console.log('Profile request received:', req.body); // Log the request body
  if (!req.user) {
    console.log(res.status(401).json({ message: "Unauthorized" }));
  } 

  res.json({ message: "User profile", user: req.user });
  
};

// export const logout = async (req: Request, res: Response): Promise<void> => {
//   console.log('Logout request received:', req.headers); // Log the request header
//   const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the Authorization header
//   console.log(token);
//   if (!token) {
//     res.status(400).json({ message: 'No token provided' });
//     return; // Exit the function early
//   }

//   try {
//     // Verify the token
//     jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
//       if (err) {
//         res.status(401).json({ message: 'Invalid or expired token' });
//         return; // Exit the function early
//       }

//       // If you have a blacklist mechanism, you can add the token to it here
//       // Example: addTokenToBlacklist(token);

//       console.log('Token is valid:', decoded); // You can log or handle the decoded token as needed

//       // Send a success response
//       res.status(200).json({ message: 'Logged out successfully' });
//       return; // Exit the function after sending the response
//     });
//   } catch (error) {
//     console.error('Error during logout:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//     return; // Exit the function early
//   }
// };