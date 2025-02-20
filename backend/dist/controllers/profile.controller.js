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
exports.getProfile = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
// Profile data logic
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('getProfile request received. User:', req.user); // Debug: Log the user object
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
