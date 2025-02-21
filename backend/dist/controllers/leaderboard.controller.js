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
exports.getLeaderboard = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const getLeaderboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sortBy = req.query.sortBy || 'stats.gamesWon';
        const validStats = [
            'stats.gamesWon',
            'stats.longestStreak',
            'stats.averageGuesses',
        ];
        if (!validStats.includes(sortBy)) {
            res.status(400).json({ message: 'Invalid sortBy parameter' });
            return;
        }
        const sortOrder = sortBy === 'stats.averageGuesses' ? 1 : -1;
        const leaderboard = yield user_model_1.default.find()
            .sort({ [sortBy]: sortOrder })
            .limit(10);
        res.json(leaderboard);
    }
    catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getLeaderboard = getLeaderboard;
