const mongoose = require('mongoose');

const SleepSchema = new mongoose.Schema({
  hours: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Sleep', SleepSchema); 