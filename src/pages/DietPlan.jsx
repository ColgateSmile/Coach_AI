import React, { useState } from 'react';

const DietPlan = () => {
  const [dietPlan, setDietPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const generateDietPlan = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3',
          messages: [{ role: 'user', content: 'Create a 7-day diet plan for a runner.' }],
          max_tokens: 500,
        }),
      });
      const data = await response.json();
      setDietPlan(data.choices[0].message.content);
    } catch (error) {
      console.error('Error generating diet plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h1>Build Diet Plan</h1>
      <button className="btn btn-primary" onClick={generateDietPlan} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Diet Plan'}
      </button>
      {dietPlan && (
        <div className="mt-4">
          <h3>Diet Plan</h3>
          <pre>{dietPlan}</pre>
        </div>
      )}
    </div>
  );
};

export default DietPlan;