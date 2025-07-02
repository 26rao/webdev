import React, { useState } from 'react';

function getBMICategory(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const h = parseFloat(height) / 100;
  const w = parseFloat(weight);
  const bmi = h && w ? (w / (h * h)).toFixed(1) : '';
  const category = bmi ? getBMICategory(bmi) : '';

  return (
    <div className="card bmi-card">
      <h2>BMI Calculator</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={e => setHeight(e.target.value)}
          style={{ width: 90 }}
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={e => setWeight(e.target.value)}
          style={{ width: 90 }}
        />
      </div>
      {bmi && (
        <div style={{ fontWeight: 600, color: '#6366f1' }}>
          BMI: {bmi} <span style={{ color: '#222', fontWeight: 400 }}>({category})</span>
        </div>
      )}
    </div>
  );
};

export default BMICalculator; 