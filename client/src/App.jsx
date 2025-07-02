import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddEntry from './pages/AddEntry';
import Progress from './pages/Progress';
import Navbar from './components/Navbar';
import EntryList from './components/EntryList';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import './styles/main.css';

const API = 'http://localhost:5000/api';

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [water, setWater] = useState([]);
  const [sleep, setSleep] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [signedIn, setSignedIn] = useState(() => localStorage.getItem('signedIn') === 'true');
  const [showRegister, setShowRegister] = useState(false);
  const [signedInUser, setSignedInUser] = useState(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const email = localStorage.getItem('signedInUserEmail');
    return users.find(u => u.email === email) || null;
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Register/sign-in logic
  const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]');
  const setUsers = users => localStorage.setItem('users', JSON.stringify(users));

  const handleSignIn = (email, password, setError) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      setError('Invalid email or password.');
      return;
    }
    setSignedIn(true);
    localStorage.setItem('signedIn', 'true');
    localStorage.setItem('signedInUserEmail', email);
    setSignedInUser(user);
  };
  const handleRegister = (email, password, setError) => {
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      setError('Email already registered.');
      return;
    }
    users.push({ email, password });
    setUsers(users);
    setShowRegister(false);
    localStorage.setItem('signedInUserEmail', email);
    setSignedInUser({ email, password });
  };
  const handleSignOut = () => {
    setSignedIn(false);
    localStorage.setItem('signedIn', 'false');
    localStorage.removeItem('signedInUserEmail');
    setSignedInUser(null);
  };

  // Fetch all data
  const fetchAll = async () => {
    const [w1, w2, w3] = await Promise.all([
      fetch(`${API}/workouts`).then(r => r.json()),
      fetch(`${API}/water`).then(r => r.json()),
      fetch(`${API}/sleep`).then(r => r.json()),
    ]);
    setWorkouts(w1);
    setWater(w2);
    setSleep(w3);
  };

  useEffect(() => { fetchAll(); }, []);

  // Add handlers
  const addWorkout = async (data) => {
    await fetch(`${API}/workouts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    fetchAll();
  };
  const addWater = async (data) => {
    await fetch(`${API}/water`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    fetchAll();
  };
  const addSleep = async (data) => {
    await fetch(`${API}/sleep`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    fetchAll();
  };

  // Delete handlers
  const deleteWorkout = async (id) => {
    await fetch(`${API}/workouts/${id}`, { method: 'DELETE' });
    fetchAll();
  };
  const deleteWater = async (id) => {
    await fetch(`${API}/water/${id}`, { method: 'DELETE' });
    fetchAll();
  };
  const deleteSleep = async (id) => {
    await fetch(`${API}/sleep/${id}`, { method: 'DELETE' });
    fetchAll();
  };

  useEffect(() => {
    // Water reminder notification
    if (window.Notification && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    // Water reminder notification logic
    if (!signedIn) return;
    const today = new Date().toISOString().slice(0, 10);
    const water = JSON.parse(localStorage.getItem('water') || '[]');
    const todayWater = water.filter(w => w.date && w.date.slice(0, 10) === today);
    const waterTotal = todayWater.reduce((sum, w) => sum + Number(w.amount || 0), 0);
    const notifiedKey = 'waterReminderNotified_' + today;
    if (waterTotal < 2000 && Notification.permission === 'granted' && !localStorage.getItem(notifiedKey)) {
      new Notification('💧 Drink Water!', { body: `You have only logged ${waterTotal}ml today. Aim for at least 2000ml!` });
      localStorage.setItem(notifiedKey, 'true');
    }
  }, [signedIn, water]);

  if (!signedIn) {
    if (showRegister) {
      return <Register onRegister={handleRegister} onBack={() => setShowRegister(false)} />;
    }
    return <SignIn onSignIn={handleSignIn} onShowRegister={() => setShowRegister(true)} />;
  }

  return (
    <Router>
      <Navbar darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)} onSignOut={handleSignOut} />
      <Routes>
        <Route path="/" element={<Dashboard workouts={workouts} water={water} sleep={sleep} userEmail={signedInUser?.email || ''} />} />
        <Route path="/add" element={<AddEntry onAddWorkout={addWorkout} onAddWater={addWater} onAddSleep={addSleep} />} />
        <Route path="/progress" element={<Progress workouts={workouts} water={water} sleep={sleep} />} />
      </Routes>
      <div style={{ maxWidth: 700, margin: '2rem auto' }}>
        <h2>All Entries</h2>
        <EntryList entries={workouts} type="Workout" onDelete={deleteWorkout} />
        <EntryList entries={water} type="Water" onDelete={deleteWater} />
        <EntryList entries={sleep} type="Sleep" onDelete={deleteSleep} />
      </div>
    </Router>
  );
}

export default App;
