import React from 'react';
import "./style.css";
import CardComponent from '../card';
import { getPriorityIcon, getStatusIcon } from '../geticon';

const Column = ({ tickets, title, groupBy, users }) => {
  return (
    <div className="column">
      <div className="column-header">
        <div className="column-header-left-container">
          {groupBy === "status" && getStatusIcon(title)}
          {groupBy === "priority" && getPriorityIcon(title)}
          <div className="column-title">
            {title}
            <span className="count">{tickets.length}</span>
          </div>
        </div>
        <div className="column-header-right-container">
          <img src="/icons/add.svg" alt="Add" width={16} height={16} />
          <img src="/icons/3dot.svg" alt="Options" width={16} height={16} />
        </div>
      </div>
      <div className="cards-container">
        {tickets.map((ticket) => (
          <CardComponent
            key={ticket.id}
            id={ticket.id}
            title={ticket.title}
            tags={ticket.tag}
            userID={ticket.userId}
            users={users}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
