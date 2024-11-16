import React from 'react';
import './style.css';
import UserIcon from '../userIcon';

const CardComponent = ({ id, title, tags, userID, users }) => {
  // Extract user name using userID
  const user = users.find(user => user.id === userID);
  const userName = user ? user.name : 'Unknown User';

  return (
    <div className="card">
      <div className="top-container">
        <div className="card-id">{id}</div>
        <UserIcon name={userName} available={user?.available || false} />
      </div>
      <h2 className="card-title">{title}</h2>
      {tags && tags.map((t) => (
        <div key={t} className="tag-container">
          <div className="tag-icon"></div>
          <div className="tag-text">{t}</div>
        </div>
      ))}
    </div>
  );
};

export default CardComponent;
