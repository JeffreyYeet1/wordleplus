import React, { useEffect, useState } from 'react';
import LogOut from '../components/logout';
import AxiosAPI from '../../axiosapi';
import axios from 'axios';
import './profile.css';

const ProfilePage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const token = localStorage.getItem('authToken');

                const response = await AxiosAPI.get('api/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });

                console.log("User data: ", response.data)
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
            Welcome to your profile!
            <LogOut />
        </div>
    );
}
export default ProfilePage;