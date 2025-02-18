const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }, // For password hashing
    stats: {
      totalGames: { type: Number, default: 0 },
      gamesWon: { type: Number, default: 0 },
      longestStreak: { type: Number, default: 0 },
      averageGuesses: { type: Number, default: 0 },
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // For friend list
    createdAt: { type: Date, default: Date.now },
  });
  
  const User = mongoose.model('User', userSchema);

  module.exports = User;
  