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
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const SALT_ROUNDS = 10;
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
        match: /^[a-zA-Z0-9_]+$/,
    }, // Alphanumeric and underscore characters only
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    }, // Basic email regex
    passwordHash: {
        type: String,
        required: true
    }, // For password hashing
    // For a later date
    // stats: {
    //   totalGames: { type: Number, default: 0 },
    //   gamesWon: { type: Number, default: 0 },
    //   longestStreak: { type: Number, default: 0 },
    //   averageGuesses: { type: Number, default: 0 },
    // },
    // friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // For friend list
    createdAt: { type: Date, default: Date.now },
});
userSchema.methods.hashPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        this.passwordHash = yield bcryptjs_1.default.hash(password, SALT_ROUNDS);
    });
};
userSchema.methods.validatePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, this.passwordHash);
    });
};
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
