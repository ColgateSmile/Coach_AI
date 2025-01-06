import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import UserDataForm from './components/UserDataForm';
import Results from './components/Results';
import Home from './pages/Home'; // Import Home
import Chat from './pages/Chat'; // Import Chat
import DietPlan from './pages/DietPlan'; // Import DietPlan
import RunningNews from './pages/RunningNews'; // Import RunningNews
import './App.css';

const App = () => {
  const [trainingProgram, setTrainingProgram] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const analyzeData = async (data) => {
    const { age, weight, hr, time, goalDistance, goalTime, trainingDays } = data;

    // Determine training plan duration based on user's fitness level
    const recentPace = calculatePace(time); // Helper function to calculate pace
    const planDuration = getPlanDuration(recentPace, goalDistance); // Helper function to determine duration

    const prompt = `Create a ${planDuration}-week running training program for a ${age}-year-old runner weighing ${weight} kg with a resting heart rate of ${hr} bpm and a recent run time of ${time}. The runner's goal is to complete a ${goalDistance} in ${goalTime}. The runner can train ${trainingDays} days per week. Format the program as follows:
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
          model: 'gpt-3.5-turbo', // Use the fastest model
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
    // Normalize the goal distance input
    const normalizedDistance = goalDistance.toLowerCase().replace(/\s/g, '');

    // Check for common distance abbreviations
    if (
      normalizedDistance.includes('marathon') ||
      normalizedDistance.includes('42k') ||
      normalizedDistance === '42'
    ) {
      if (recentPace <= 5.0) return 12; // Advanced runner
      if (recentPace <= 6.0) return 16; // Intermediate runner
      return 20; // Beginner
    } else if (
      normalizedDistance.includes('halfmarathon') ||
      normalizedDistance.includes('21k') ||
      normalizedDistance === '21'
    ) {
      if (recentPace <= 5.0) return 8;
      if (recentPace <= 6.0) return 12;
      return 16;
    } else if (
      normalizedDistance.includes('10k') ||
      normalizedDistance === '10'
    ) {
      if (recentPace <= 5.0) return 6;
      if (recentPace <= 6.0) return 8;
      return 12;
    } else {
      return 8; // Default for other distances
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Container className="mt-4">
          <Routes>
            <Route
              path="/"
              element={
                <>
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
                </>
              }
            />
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/diet-plan" element={<DietPlan />} />
            <Route path="/running-news" element={<RunningNews />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;