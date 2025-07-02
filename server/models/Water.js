const mongoose = require('mongoose');

const WaterSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Water', WaterSchema); 