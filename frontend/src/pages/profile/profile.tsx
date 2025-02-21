import React, { useEffect, useState } from 'react';
import LogOut from '../components/logout';
import AxiosAPI from '../../axiosapi';
import axios from 'axios';
import './profile.css';
import UI from '../components/UI';

const ProfilePage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
    // Calls when component is mounted, aka when this page is visited
    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const token = localStorage.getItem('authToken');

                const response = await AxiosAPI.get('api/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });

                console.log('User data: ', response.data);
                // const userDataArray = Object.entries(response.data.user);
                // console.log(userDataArray);
                setUserData(response.data.user);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                  console.error('Axios error:', error.response?.data || error.message);
                  setError(error.response?.data?.message || error.message);
                } else {
                  console.error('Unknown error:', error);
                  setError('An unknown error occurred');
                }
              }
        };
        fetchUserData();
    }, []);

    return(
        <div className='profilecontainer'>
            <UI />
            <h1>Welcome to your profile!</h1>
            {userData && (
            <div>
                <p>Email: {userData.email}</p>
                <p>Username: {userData.username}</p>
                <p>Joined: {userData.createdAt}</p>
                <p>Games Played: {userData.stats.totalGames}</p>
                <p>Games Won: {userData.stats.gamesWon}</p>
                <p>Current Streak: {userData.stats.currentStreak}</p>
                <p>Longest Streak: {userData.stats.longestStreak}</p>
                <p>Guess distribution: {userData.stats.guessDist}</p>
                <p>Average Guesses: {userData.stats.averageGuesses}</p>
            </div>
            )}
        </div>
    );
}
export default ProfilePage;