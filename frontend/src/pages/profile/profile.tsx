import React from 'react';
import LogOut from '../components/logout';
import './profile.css';

const ProfilePage: React.FC = () => {
    return(
        <div className='profilecontainer'>
            Welcome to your profile!
            <LogOut />
        </div>
    );
};

export default ProfilePage;