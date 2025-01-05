import React, { useState } from 'react';

const UserDataForm = ({ onAnalyze }) => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [hr, setHr] = useState('');
  const [time, setTime] = useState('');
  const [goalDistance, setGoalDistance] = useState('');
  const [goalTime, setGoalTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze({ age, weight, hr, time, goalDistance, goalTime });
  };

  return (
    <div className="user-data-form card mb-4">
      <div className="card-body">
        <h2>Enter Your Details</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            className="form-control mb-2"
          />
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight (kg)"
            className="form-control mb-2"
          />
          <input
            type="number"
            value={hr}
            onChange={(e) => setHr(e.target.value)}
            placeholder="Resting Heart Rate (bpm)"
            className="form-control mb-2"
          />
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Recent Run Time (e.g., 5k in 25:00)"
            className="form-control mb-2"
          />
          <input
            type="text"
            value={goalDistance}
            onChange={(e) => setGoalDistance(e.target.value)}
            placeholder="Goal Distance (e.g., 10k)"
            className="form-control mb-2"
          />
          <input
            type="text"
            value={goalTime}
            onChange={(e) => setGoalTime(e.target.value)}
            placeholder="Goal Time (e.g., 50:00)"
            className="form-control mb-2"
          />
          <button type="submit" className="btn btn-primary w-100">
            Analyze My Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDataForm;