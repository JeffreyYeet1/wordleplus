import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware'; // Import the custom Request type
import User from '../models/user.model';

interface statRequestBody {
    gameWon: boolean;
    number: number;
}

// postUser logic
export const postUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {  // Use AuthenticatedRequest here
    console.log('postUser request received: ', req.body);

    const { gameWon, number }: statRequestBody = req.body;
    console.log(gameWon, number);

    // Check if user is authenticated
    if (!req.user) {
        console.log("User not authenticated");
        res.status(401).json({ message: "User not authenticated" });
        return;
    }

    try {
        // Get the user from the database using the userId from req.user (set by the authentication middleware)
        const user = await User.findById(req.user.userId); // Use req.user.userId, not req.body.userId
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
        user.stats.guessDist[number-1] += 1;
        user.stats.averageGuesses = parseFloat(((number + user.stats.guessDist.reduce((sum, guess, index) => sum + guess * (index + 1), 0)) / (user.stats.totalGames + 1)).toFixed(2));

        // Save the updated user stats
        await user.save();

        console.log("Updated user stats: ", user.stats);

        // Send the response back
        res.status(200).json({ message: "User stats updated successfully" });
    } catch (error) {
        console.error("Error sending stats: ", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
