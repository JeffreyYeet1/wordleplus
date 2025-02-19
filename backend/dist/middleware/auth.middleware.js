"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Authenticates the json web token to protect certain pages. 
const authenticateToken = (req, res, next) => {
    // Extracts the token from the authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // Checks if token exists
    if (!token) {
        console.log("Access Denied: No token provided");
        res.status(401).json({ message: "Access Denied: No token provided" }); // Return to stop further execution
        return;
    }
    try {
        // Get JWT_SECRET from .env file
        const JWT_SECRET = process.env.JWT_SECRET;
        // Ensure JWT_SECRET is defined
        if (!JWT_SECRET) {
            console.log(res.status(500).json({ error: 'JWT secret is not configured' }));
            return;
        }
        // Verify the jwt token
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                console.log('Token verification failed:', err.message);
                return res.status(403).json({ error: 'Forbidden: Invalid token' });
            }
            // Attach the user to the request object allowing use of information
            req.user = user;
            next();
        });
    }
    catch (error) {
        console.log("Invalid or expired token:", error);
        res.status(403).json({ message: "Invalid or expired token" }); // Return to stop further execution
        return;
    }
};
exports.default = authenticateToken;
