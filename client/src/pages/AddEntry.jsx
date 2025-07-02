import React, { useState } from 'react';

const todayStr = () => new Date().toISOString().slice(0, 10);

const AddEntry = ({ onAddWorkout, onAddWater, onAddSleep }) => {
  const [workout, setWorkout] = useState({ type: '', duration: '', date: todayStr() });
  const [water, setWater] = useState({ amount: '', date: todayStr() });
  const [sleep, setSleep] = useState({ hours: '', date: todayStr() });

  return (
    <div className="add-entry">
      <h1>Add Entry</h1>
      <div className="entry-forms">
        <form onSubmit={e => { e.preventDefault(); onAddWorkout(workout); setWorkout({ type: '', duration: '', date: todayStr() }); }}>
          <h2>Workout</h2>
          <input placeholder="Type" value={workout.type} onChange={e => setWorkout({ ...workout, type: e.target.value })} required />
          <input type="number" placeholder="Duration (min)" value={workout.duration} onChange={e => setWorkout({ ...workout, duration: e.target.value })} required />
          <input type="date" value={workout.date} onChange={e => setWorkout({ ...workout, date: e.target.value })} required />
          <button type="submit">Add Workout</button>
        </form>
        <form onSubmit={e => { e.preventDefault(); onAddWater(water); setWater({ amount: '', date: todayStr() }); }}>
          <h2>Water</h2>
          <input type="number" placeholder="Amount (ml)" value={water.amount} onChange={e => setWater({ ...water, amount: e.target.value })} required />
          <input type="date" value={water.date} onChange={e => setWater({ ...water, date: e.target.value })} required />
          <button type="submit">Add Water</button>
        </form>
        <form onSubmit={e => { e.preventDefault(); onAddSleep(sleep); setSleep({ hours: '', date: todayStr() }); }}>
          <h2>Sleep</h2>
          <input type="number" placeholder="Hours" value={sleep.hours} onChange={e => setSleep({ ...sleep, hours: e.target.value })} required />
          <input type="date" value={sleep.date} onChange={e => setSleep({ ...sleep, date: e.target.value })} required />
          <button type="submit">Add Sleep</button>
        </form>
      </div>
    </div>
  );
};

export default AddEntry; 