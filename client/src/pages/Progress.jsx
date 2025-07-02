import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function sumByDay(entries, key) {
  const days = getLast7Days();
  return days.map(day => {
    const filtered = entries.filter(e => e.date && e.date.slice(0, 10) === day);
    if (key === 'duration') return filtered.reduce((sum, e) => sum + (e.duration || 0), 0);
    if (key === 'amount') return filtered.reduce((sum, e) => sum + (e.amount || 0), 0);
    if (key === 'hours') return filtered.reduce((sum, e) => sum + (e.hours || 0), 0);
    return 0;
  });
}

const Progress = ({ workouts, water, sleep }) => {
  const days = getLast7Days();
  const workoutData = {
    labels: days,
    datasets: [
      {
        label: 'Workout Duration (min)',
        data: sumByDay(workouts, 'duration'),
        backgroundColor: '#4f8cff',
      },
    ],
  };
  const waterData = {
    labels: days,
    datasets: [
      {
        label: 'Water Intake (ml)',
        data: sumByDay(water, 'amount'),
        backgroundColor: '#00bcd4',
      },
    ],
  };
  const sleepData = {
    labels: days,
    datasets: [
      {
        label: 'Sleep (hours)',
        data: sumByDay(sleep, 'hours'),
        backgroundColor: '#8bc34a',
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };
  return (
    <div className="progress">
      <h1>Weekly Progress</h1>
      <div className="progress-charts">
        <div className="chart-card">
          <h2>Workouts</h2>
          <Bar data={workoutData} options={options} />
        </div>
        <div className="chart-card">
          <h2>Water Intake</h2>
          <Bar data={waterData} options={options} />
        </div>
        <div className="chart-card">
          <h2>Sleep</h2>
          <Bar data={sleepData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Progress; 