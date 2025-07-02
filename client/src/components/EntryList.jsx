import React from 'react';

const EntryList = ({ entries, type, onDelete }) => (
  <div className="entry-list">
    <h3>{type} Entries</h3>
    {entries.length === 0 ? <p>No entries.</p> : (
      <ul>
        {entries.map(entry => (
          <li key={entry._id}>
            {type === 'Workout' && `${entry.type} - ${entry.duration} min`}
            {type === 'Water' && `${entry.amount} ml`}
            {type === 'Sleep' && `${entry.hours} hours`}
            <button onClick={() => onDelete(entry._id)}>Delete</button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default EntryList; 