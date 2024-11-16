import React from 'react';

export const getPriorityIcon = (priority) => {
  const iconMap = {
    "No Priority": "/icons/no-priority.svg",
    "Low": "/icons/low.svg",
    "Medium": "/icons/medium.svg",
    "High": "/icons/high.svg",
    "Urgent": "/icons/urgent.svg",
  };

  const iconSrc = iconMap[priority] || iconMap["Urgent"];

  return <img src={iconSrc} alt={`${priority} priority`} width={14} height={14} />;
};

export const getStatusIcon = (status) => {
  const iconMap = {
    "Backlog": "/icons/Backlog.svg",
    "Todo": "/icons/todo.svg",
    "In progress": "/icons/in-progress.svg",
    "Done": "/icons/done.svg",
    "Cancelled": "/icons/Cancelled.svg",
  };

  const iconSrc = iconMap[status] || iconMap["Cancelled"];

  return <img src={iconSrc} alt={`${status} status`} width={16} height={16} />;
};
