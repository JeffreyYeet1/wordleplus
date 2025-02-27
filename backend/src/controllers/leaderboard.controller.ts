import { Request, Response } from 'express';
import User from '../models/user.model';

export const getLeaderboard = async (req: Request, res: Response):Promise<void> => {
    try {
        const sortBy = req.query.sortBy as string || 'stats.gamesWon';

        // List of stats we want to display
        const validStats = [
            'stats.gamesWon',
            'stats.longestStreak',
            'stats.averageGuesses',
        ];

        if (!validStats.includes(sortBy)) {
            res.status(400).json({ message: 'Invalid sortBy parameter' });
            return;
        }

        // Sort average guesses in ascending order since lower is better
        const sortOrder = sortBy === 'stats.averageGuesses' ? 1 : -1; 
        const leaderboard = await User.find({ 
            [sortBy]: { $ne: 0 }  // Excludes entries where the stat is 0
        })
            .sort({ [sortBy]: sortOrder })
            .limit(10);

        res.json(leaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ message: 'Server error' });
    }
};