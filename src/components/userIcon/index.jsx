import React from 'react';
import './style.css';

const UserIcon = ({ name, available }) => {
    // Create initials from the user's name
    const initials = name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();

    return (
        <div className="usericon-container">
            {/* Display initials */}
            <div className="user-initials">{initials}</div>
            {/* Status icon with conditional class */}
            <div className={`user-status ${available ? 'available' : ''}`}></div>
        </div>
    );
};

export default UserIcon;
