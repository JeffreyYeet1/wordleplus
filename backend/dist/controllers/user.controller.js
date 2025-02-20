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
exports.postUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
// postUser logic
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('postUser request received: ', req.body);
    const { gameWon, number } = req.body;
    console.log(gameWon, number);
    // Check if user is authenticated
    if (!req.user) {
        console.log("User not authenticated");
        res.status(401).json({ message: "User not authenticated" });
        return;
    }
    try {
        // Get the user from the database using the userId from req.user (set by the authentication middleware)
        const user = yield user_model_1.default.findById(req.user.userId); // Use req.user.userId, not req.body.userId
        if (!user) {
            console.log("User not found");
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Process stats (for example, update the stats)
        user.stats.totalGames += 1;
        user.stats.gamesWon += gameWon ? 1 : 0;
        user.stats.currentStreak = gameWon ? user.stats.currentStreak + 1 : 0;
        user.stats.longestStreak = Math.max(user.stats.longestStreak, user.stats.currentStreak);
        user.stats.guessDist[number - 1] += 1;
        user.stats.averageGuesses = parseFloat(((number + user.stats.guessDist.reduce((sum, guess, index) => sum + guess * (index + 1), 0)) / (user.stats.totalGames + 1)).toFixed(2));
        // Save the updated user stats
        yield user.save();
        console.log("Updated user stats: ", user.stats);
        // Send the response back
        res.status(200).json({ message: "User stats updated successfully" });
    }
    catch (error) {
        console.error("Error sending stats: ", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.postUser = postUser;
