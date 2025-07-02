const express = require('express');
const Workout = require('../models/Workout');
const Water = require('../models/Water');
const Sleep = require('../models/Sleep');

const router = express.Router();

// --- Workout Routes ---
router.get('/workouts', async (req, res) => {
  const workouts = await Workout.find().sort({ date: -1 });
  res.json(workouts);
});

router.post('/workouts', async (req, res) => {
  const data = req.body;
  if (!data.date) data.date = new Date();
  const workout = new Workout(data);
  await workout.save();
  res.status(201).json(workout);
});

router.put('/workouts/:id', async (req, res) => {
  const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(workout);
});

router.delete('/workouts/:id', async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.json({ message: 'Workout deleted' });
});

// --- Water Routes ---
router.get('/water', async (req, res) => {
  const water = await Water.find().sort({ date: -1 });
  res.json(water);
});

router.post('/water', async (req, res) => {
  const data = req.body;
  if (!data.date) data.date = new Date();
  const water = new Water(data);
  await water.save();
  res.status(201).json(water);
});

router.put('/water/:id', async (req, res) => {
  const water = await Water.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(water);
});

router.delete('/water/:id', async (req, res) => {
  await Water.findByIdAndDelete(req.params.id);
  res.json({ message: 'Water entry deleted' });
});

// --- Sleep Routes ---
router.get('/sleep', async (req, res) => {
  const sleep = await Sleep.find().sort({ date: -1 });
  res.json(sleep);
});

router.post('/sleep', async (req, res) => {
  const data = req.body;
  if (!data.date) data.date = new Date();
  const sleep = new Sleep(data);
  await sleep.save();
  res.status(201).json(sleep);
});

router.put('/sleep/:id', async (req, res) => {
  const sleep = await Sleep.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(sleep);
});

router.delete('/sleep/:id', async (req, res) => {
  await Sleep.findByIdAndDelete(req.params.id);
  res.json({ message: 'Sleep entry deleted' });
});

module.exports = router; 