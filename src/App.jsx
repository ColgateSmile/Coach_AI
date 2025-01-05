import React, { useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import UserDataForm from './components/UserDataForm';
import Results from './components/Results';
import './App.css';

const App = () => {
  const [trainingProgram, setTrainingProgram] = useState('');
  const [loading, setLoading] = useState(false);

  const analyzeData = async (data) => {
    const { age, weight, hr, time, goalDistance, goalTime } = data;

    // Determine training plan duration based on user's fitness level
    const recentPace = calculatePace(time); // Helper function to calculate pace
    const planDuration = getPlanDuration(recentPace, goalDistance); // Helper function to determine duration

    const prompt = `Create a ${planDuration}-week running training program for a ${age}-year-old runner weighing ${weight} kg with a resting heart rate of ${hr} bpm and a recent run time of ${time}. The runner's goal is to complete a ${goalDistance} in ${goalTime}. Format the program as follows:
Week 1:
- Day 1: Activity
- Day 2: Activity
...
Week 2:
- Day 1: Activity
- Day 2: Activity
...`;

    setLoading(true); // Start loading animation
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 500,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      setTrainingProgram(aiResponse);
    } catch (error) {
      console.error('Error generating training plan:', error);
      setTrainingProgram('Sorry, something went wrong. Please try again.');
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  // Helper function to calculate pace (min/km)
  const calculatePace = (time) => {
    const [distance, duration] = time.split(' in ');
    const [minutes, seconds] = duration.split(':').map(Number);
    const totalMinutes = minutes + seconds / 60;
    const pace = totalMinutes / parseFloat(distance);
    return pace.toFixed(2);
  };

  // Helper function to determine plan duration
  const getPlanDuration = (recentPace, goalDistance) => {
    if (goalDistance.toLowerCase().includes('marathon')) {
      if (recentPace <= 5.0) return 12; // Advanced runner
      if (recentPace <= 6.0) return 16; // Intermediate runner
      return 20; // Beginner
    } else if (goalDistance.toLowerCase().includes('half marathon')) {
      if (recentPace <= 5.0) return 8;
      if (recentPace <= 6.0) return 12;
      return 16;
    } else if (goalDistance.toLowerCase().includes('10k')) {
      if (recentPace <= 5.0) return 6;
      if (recentPace <= 6.0) return 8;
      return 12;
    } else {
      return 8; // Default for other distances
    }
  };

  return (
    <div className="app">
      <Header />
      <Container className="mt-4">
        <h1 className="text-center mb-4">Running AI Coach</h1>
        <UserDataForm onAnalyze={analyzeData} />
        {loading && (
          <div className="text-center mt-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Generating your training plan...</p>
          </div>
        )}
        <Results results={trainingProgram} />
      </Container>
      <Footer />
    </div>
  );
};

export default App;