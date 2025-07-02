import React, { useState, useEffect } from 'react';

const Notes = ({ userEmail }) => {
  const today = new Date().toISOString().slice(0, 10);
  const key = `note_${userEmail}_${today}`;
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setNote(localStorage.getItem(key) || '');
  }, [key]);

  const saveNote = () => {
    localStorage.setItem(key, note);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  return (
    <div className="card notes-card">
      <h2>Daily Note</h2>
      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Write a short note or journal entry for today..."
        rows={3}
        style={{ width: '100%', borderRadius: 6, padding: 8, border: '1.2px solid #a5b4fc', resize: 'vertical' }}
      />
      <button onClick={saveNote} style={{ marginTop: 8 }}>
        Save Note
      </button>
      {saved && <span style={{ color: '#6366f1', marginLeft: 8 }}>Saved!</span>}
    </div>
  );
};

export default Notes; 