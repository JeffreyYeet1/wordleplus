import React, { useEffect, useState } from 'react';
import LogOut from '../components/logout';
import AxiosAPI from '../../axiosapi';
import axios from 'axios';
import './profile.css';

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
            <h1>Welcome to your profile!</h1>
            {userData && (
            <div>
                <p>Email: {userData.email}</p>
                <p>Username: {userData.username}</p>
                <p>Joined: {userData.createdAt}</p>
            </div>
            )}
            <LogOut />
        </div>
    );
}
export default ProfilePage;