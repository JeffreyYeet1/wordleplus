import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Used for password hashing
const SALT_ROUNDS = 10;

// Interface for the User document
export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  stats: {
    totalGames: number;
    gamesWon: number;
    lastGameWon: boolean;
    currentStreak: number;
    longestStreak: number;
    guessDist: number[]; // Array of numbers
    averageGuesses: number;
  };
  hashPassword(password: string): Promise<void>;
  validatePassword(password: string): Promise<boolean>;
}

// New user schema
const userSchema = new mongoose.Schema({
    username: { 
      type: String, 
      required: true, 
      unique: true,
      minlength: 3,
      maxlength: 12,
      match: /^[a-zA-Z0-9_]+$/,  // Alphanumeric and underscore characters only
    },

    email: { 
      type: String, 
      required: true, 
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  // Basic email regex
    },

    passwordHash: { 
      type: String, 
      required: true,
    },

    stats: {
      totalGames: { type: Number, default: 0 },
      gamesWon: { type: Number, default: 0 },
      lastGameWon: { type: Boolean, default: false },
      currentStreak: { type: Number, default: 0 },
      longestStreak: { type: Number, default: 0 },
      guessDist: { type: [Number], default: [0, 0, 0, 0, 0, 0] },  // Array of numbers
      averageGuesses: { type: Number, default: 0 },
    },

    createdAt: { type: Date, default: Date.now },
});

// Method to hash password using salt rounds
userSchema.methods.hashPassword = async function (password: string) {
    this.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
};

// Method to validate the password
userSchema.methods.validatePassword = async function (password: string) {
    return await bcrypt.compare(password, this.passwordHash);
};

// Creates the user model and exports it
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
