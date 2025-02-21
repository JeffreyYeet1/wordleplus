import mongoose from 'mongoose';

// New leaderboard schema
const leaderboardSchema = new mongoose.Schema({
    username: { 
      type: String, 
      required: true, 
      unique: true,
      minlength: 3,
      maxlength: 12,
      match: /^[a-zA-Z0-9_]+$/,  // Alphanumeric and underscore characters only
    },

    stats: {
      totalGames: { type: Number, default: 0 },
      gamesWon: { type: Number, default: 0 },
      lastGameWon: { type: Boolean, default: false },
      currentStreak: { type: Number, default: 0 },
      longestStreak: { type: Number, default: 0 },
      guessDist: { type: [Number], default: [0, 0, 0, 0, 0, 0] },  // Array of numbers
      averageGuesses: { type: Number, default: 0 },
    },

});

const leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

export default leaderboard;
