import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { contentApi } from './utils/api';
import Header from './components/header';
import './App.css';
import Column from './components/column';

const App = () => {
  const [grouping, setGrouping] = useState('status'); // Including 'user' as a valid grouping option
  const [ordering, setOrdering] = useState('priority');

  const { data, error, isLoading } = useQuery({
    queryKey: ['apifetch'],
    queryFn: async () => {
      const data = await contentApi('https://api.quicksell.co/v1/internal/frontend-assignment');
      return { tickets: data.tickets, users: data.users };
    },
  });

  // Group tickets based on the selected grouping option
  const groupTickets = (grouping) => {
    let grouped = {};

    if (data) {
      const { tickets, users } = data;

      // Initialize predefined groups
      const predefinedGroups = {
        status: ['Backlog', 'Todo', 'In progress', 'Done', 'Canceled'],
        priority: ['No Priority', 'Low', 'Medium', 'High', 'Urgent'],
        user: users.map(user => user.name).concat('Unknown'),
      };

      const currentGroups = predefinedGroups[grouping] || [];

      // Create empty arrays for all predefined groups
      currentGroups.forEach(group => {
        grouped[group] = [];
      });

      // Fill groups with tickets
      tickets.forEach(ticket => {
        let groupKey;

        if (grouping === 'status') {
          groupKey = ticket.status || 'Unknown';
        } else if (grouping === 'user') {
          const user = users.find(user => user.id === ticket.userId);
          groupKey = user ? user.name : 'Unknown';
        } else if (grouping === 'priority') {
          switch (ticket.priority) {
            case 0:
              groupKey = 'No Priority';
              break;
            case 1:
              groupKey = 'Low';
              break;
            case 2:
              groupKey = 'Medium';
              break;
            case 3:
              groupKey = 'High';
              break;
            case 4:
              groupKey = 'Urgent';
              break;
            default:
              groupKey = 'Unknown';
          }
        } else {
          groupKey = 'Unknown';
        }

        if (!grouped[groupKey]) {
          grouped[groupKey] = [];
        }
        grouped[groupKey].push(ticket);
      });
    }

    return grouped;
  };

  // Sort tickets based on the selected ordering option
  const sortTickets = (tickets, ordering) => {
    return tickets.sort((a, b) => {
      if (ordering === 'priority') {
        return b.priority - a.priority; // Sort by priority descending
      }
      if (ordering === 'title') {
        return a.title.localeCompare(b.title); // Sort by title ascending
      }
      return 0;
    });
  };

  // Group and sort tickets based on the selected options
  const groupedTickets = groupTickets(grouping);
  const sortedTickets = Object.keys(groupedTickets).map(groupKey => ({
    group: groupKey,
    tickets: sortTickets(groupedTickets[groupKey], ordering),
  }));

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }
  console.log(sortedTickets);

  return (
    <div className="App">
      <Header
        grouping={grouping}
        setGrouping={(groupBy) => setGrouping(groupBy)}
        ordering={ordering}
        setOrdering={(orderBy) => setOrdering(orderBy)}
      />
      <div className="grid">
        {sortedTickets.map((group, index) => (
          <Column users={data?.users || []} groupBy={grouping} title={group.group} tickets={group.tickets} key={index} />
        ))}
      </div>
    </div>
  );
};

export default App;
