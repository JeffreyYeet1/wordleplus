"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return decoded; // Token is valid, return the decoded data
    }
    catch (error) {
        console.error('JWT verification failed:', error);
        return {
            id: "",
            username: "",
            email: "",
        }; // Return null if token is invalid
    }
};
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        console.log("Access Denied: No token provided");
        res.status(401).json({ message: "Access Denied: No token provided" }); // Return to stop further execution
        return;
    }
    try {
        const decoded = verifyToken(token);
        console.log(decoded);
        req.user = decoded; // Attach the decoded token to req.user
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        console.log("Invalid or expired token:", error);
        res.status(403).json({ message: "Invalid or expired token" }); // Return to stop further execution
        return;
    }
};
exports.default = authenticateToken;
