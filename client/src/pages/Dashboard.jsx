import React from 'react';
import { Link } from 'react-router-dom';
import BMICalculator from '../components/BMICalculator';
import Notes from '../components/Notes';

const WATER_GOAL = 2000;

function estimateCalories(type, duration) {
  const t = type.toLowerCase();
  if (t.includes('run')) return duration * 10;
  if (t.includes('cycle')) return duration * 8;
  if (t.includes('yoga')) return duration * 4;
  if (t.includes('walk')) return duration * 5;
  if (t.includes('swim')) return duration * 9;
  if (t.includes('gym') || t.includes('weight')) return duration * 7;
  return duration * 6;
}

const Dashboard = ({ workouts, water, sleep, userEmail }) => {
  const today = new Date().toISOString().slice(0, 10);
  const todayWorkouts = workouts.filter(w => w.date.slice(0, 10) === today);
  const todayWater = water.filter(w => w.date.slice(0, 10) === today);
  const todaySleep = sleep.filter(s => s.date.slice(0, 10) === today);
  const waterTotal = todayWater.reduce((sum, w) => sum + Number(w.amount || 0), 0);

  return (
    <div className="dashboard">
      {waterTotal < WATER_GOAL && (
        <div className="reminder-banner">
          💧 Don't forget to drink water! You've logged {waterTotal}ml today. Aim for at least {WATER_GOAL}ml.
        </div>
      )}
      <h1>FitTrack Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">
          <h2>Today's Workouts</h2>
          {todayWorkouts.length ? todayWorkouts.map(w => (
            <div key={w._id}>
              {w.type} - {w.duration} min
              <span style={{ color: '#6366f1', fontWeight: 500, marginLeft: 8 }}>
                (~{estimateCalories(w.type, w.duration)} kcal)
              </span>
            </div>
          )) : <p>No workouts logged.</p>}
        </div>
        <div className="card">
          <h2>Water Intake</h2>
          <p>{waterTotal} ml</p>
        </div>
        <div className="card">
          <h2>Sleep</h2>
          <p>{todaySleep.length ? todaySleep[0].hours : 0} hours</p>
        </div>
      </div>
      <div className="dashboard-actions">
        <Link to="/add">Add Entry</Link>
        <Link to="/progress">View Progress</Link>
      </div>
      <div className="dashboard-extras">
        <BMICalculator />
        <Notes userEmail={userEmail} />
      </div>
    </div>
  );
};

export default Dashboard; 