"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
// Signup logic
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Signup request received:', req.body); // Add this line
    const { username, email, password } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        console.log("JWT_SECRET not found");
        return;
    }
    try {
        // Check if user already exists
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }
        // Create a new user
        const user = new user_model_1.default({ username, email });
        yield user.hashPassword(password); // Hash the password
        yield user.save();
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User created', token });
    }
    catch (error) {
        console.error('Signup error: ', error);
        res.status(500).json({ error: error.message });
    }
});
exports.signup = signup;
// Login logic
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Login request received:', req.body.email); // Log the request body
    const { email, password } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        console.log("JWT_SECRET not found");
        return;
    }
    try {
        // Find the user by email
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ error: 'User not found' });
            return;
        }
        // Validate the password
        const isValid = yield user.validatePassword(password);
        if (!isValid) {
            res.status(400).json({ error: 'Invalid password' });
            return;
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    }
    catch (error) {
        console.error('Login error: ', error);
        res.status(500).json({ error: error.message });
    }
});
exports.login = login;
// Profile data logic
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Profile request received. User:', req.user); // Debug: Log the user object
    if (!req.user) {
        console.log('Unauthorized access attempt'); // Debug: Log unauthorized access
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const userId = req.user.userId;
        console.log(userId);
        const user = yield user_model_1.default.findById(userId).select('-passwordHash');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: "User profile", user });
    }
    catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getProfile = getProfile;
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
