import React, { useState, useEffect } from 'react';
import AxiosAPI from '../../axiosapi';
import './leaderboard.css';

const Leaderboard: React.FC = () => {
    const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentStatIndex, setCurrentStatIndex] = useState<number>(0); // Track the current stat index

    // Define the stats and their display names
    const stats = [
        { key: 'stats.gamesWon', label: 'Games Won' },
        { key: 'stats.longestStreak', label: 'Longest Streak' },
        { key: 'stats.averageGuesses', label: 'Average Guesses' },
    ];

    // Get the current stat based on the index
    const currentStat = stats[currentStatIndex];

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await AxiosAPI.get(`api/auth/leaderboard?sortBy=${currentStat.key}`);
                setLeaderboardData(response.data);
                setError(null);
            } catch (error) {
                console.error("Problem fetching leaderboard data:", error);
                setError("Failed to fetch leaderboard data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboardData();

        const interval = setInterval(fetchLeaderboardData, 2000);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [currentStatIndex]); // Re-fetch data when currentStat changes

    const handleNextStat = () => {
        setCurrentStatIndex((prevIndex) => (prevIndex + 1) % stats.length); // Cycle to the next stat
    };

    const handlePreviousStat = () => {
        setCurrentStatIndex((prevIndex) => (prevIndex - 1 + stats.length) % stats.length); // Cycle to the previous stat
    };

    if (loading) {
        return <div>Loading leaderboard...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='leaderboardcontainer'>
            <h1>Leaderboard</h1>
            <span className="stat-label">{currentStat.label}</span>
            <div className="stat-navigation">
                <button onClick={handlePreviousStat}>&larr;</button>
                <button onClick={handleNextStat}>&rarr;</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>{currentStat.label}</th> {/* Dynamic column header */}
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((user: any, index: number) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>
                                {currentStat.key === 'stats.gamesWon' && user.stats.gamesWon}
                                {currentStat.key === 'stats.longestStreak' && user.stats.longestStreak}
                                {currentStat.key === 'stats.averageGuesses' && user.stats.averageGuesses}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;