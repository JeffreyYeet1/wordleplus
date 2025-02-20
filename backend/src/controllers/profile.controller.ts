import { Response } from 'express';
import User from '../models/user.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

// Profile data logic
export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    console.log('getProfile request received. User:', req.user); // Debug: Log the user object
    if (!req.user) {
      console.log('Unauthorized access attempt'); // Debug: Log unauthorized access
      res.status(401).json({ message: "Unauthorized" });
      return;
    } 
    try{
      const userId = req.user.userId;
      console.log(userId);
      const user = await User.findById(userId).select('-passwordHash');
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json({ message: "User profile", user });
    } catch(error){
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };