import axios from 'axios';
import { scrapeWebsite } from './scrapeWebsite';
import { fetchWeatherData } from './fetchWeatherData';
import { dataSources } from '../dataSources';

export const generateResponseWithRAG = async (prompt) => {
  // Step 1: Retrieve data from sources
  const retrievedData = [];
  for (const source of dataSources) {
    if (source.type === 'website') {
      const data = await scrapeWebsite(source.url);
      retrievedData.push(...data);
    } else if (source.type === 'api') {
      const data = await fetchWeatherData('New York'); // Example: Fetch weather data
      retrievedData.push(data);
    }
  }

  // Step 2: Combine retrieved data with the prompt
  const context = retrievedData
    .map((item) => JSON.stringify(item))
    .join('\n');

  const fullPrompt = `Context:\n${context}\n\nQuestion: ${prompt}`;

  // Step 3: Send the combined prompt to OpenAI
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: fullPrompt }],
      max_tokens: 500,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
    }
  );

  return response.data.choices[0].message.content;
};