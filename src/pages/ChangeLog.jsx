import React, { useState } from 'react';
import './ChangeLog.css';

const ChangeLog = () => {
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const changes = [
    {
      id: 1,
      date: '2024-03-20',
      author: 'John Doe',
      type: 'feature',
      component: 'Categories',
      description: 'Added new categories for Vehicles section',
      ticket: 'CL-123',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-03-19',
      author: 'Jane Smith',
      type: 'bug',
      component: 'Categories',
      description: 'Fixed issue with category deletion',
      ticket: 'CL-124',
      status: 'completed'
    },
    {
      id: 3,
      date: '2024-03-18',
      author: 'Mike Johnson',
      type: 'enhancement',
      component: 'Categories',
      description: 'Improved category filtering performance',
      ticket: 'CL-125',
      status: 'in-progress'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-yellow-500';
      case 'pending':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'feature':
        return 'bg-blue-500';
      case 'bug':
        return 'bg-red-500';
      case 'enhancement':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredChanges = changes.filter(change => {
    if (typeFilter !== 'all' && change.type !== typeFilter) return false;
    if (statusFilter !== 'all' && change.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="change-log">
      <h1>Change Log</h1>
      
      <div className="change-log-filters">
        <div className="filter-group">
          <label htmlFor="type-filter">Filter by Type</label>
          <select
            id="type-filter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="feature">Feature</option>
            <option value="bug">Bug</option>
            <option value="enhancement">Enhancement</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="status-filter">Filter by Status</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="changes-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Author</th>
              <th>Type</th>
              <th>Component</th>
              <th>Description</th>
              <th>Ticket</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredChanges.map(change => (
              <tr key={change.id}>
                <td>{change.date}</td>
                <td>{change.author}</td>
                <td>
                  <span className={`type-badge ${getTypeColor(change.type)}`}>
                    {change.type}
                  </span>
                </td>
                <td>{change.component}</td>
                <td>{change.description}</td>
                <td>{change.ticket}</td>
                <td>
                  <span className={`status-badge ${getStatusColor(change.status)}`}>
                    {change.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChangeLog; 