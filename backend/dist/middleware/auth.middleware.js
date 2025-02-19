"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.log("Access Denied: No token provided");
        res.status(401).json({ message: "Access Denied: No token provided" }); // Return to stop further execution
        return;
    }
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        // Ensure JWT_SECRET is defined
        if (!JWT_SECRET) {
            console.log(res.status(500).json({ error: 'JWT secret is not configured' }));
            return;
        }
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Forbidden: Invalid token' });
            }
            req.user = user; // Attach the user to the request object
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
