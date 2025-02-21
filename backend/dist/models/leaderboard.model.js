"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// New leaderboard schema
const leaderboardSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
        match: /^[a-zA-Z0-9_]+$/, // Alphanumeric and underscore characters only
    },
    stats: {
        totalGames: { type: Number, default: 0 },
        gamesWon: { type: Number, default: 0 },
        lastGameWon: { type: Boolean, default: false },
        currentStreak: { type: Number, default: 0 },
        longestStreak: { type: Number, default: 0 },
        guessDist: { type: [Number], default: [0, 0, 0, 0, 0, 0] }, // Array of numbers
        averageGuesses: { type: Number, default: 0 },
    },
});
const leaderboard = mongoose_1.default.model('Leaderboard', leaderboardSchema);
exports.default = leaderboard;
