// backend/server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const RAPID_API_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; ; // ⬅️ Replace with your key
const API_URL = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?next=10';

app.get('/api/matches', async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
      },
    });

    const data = await response.json();

      if (!response.ok) {
      console.error('API Error:', data);
      return res.status(500).json({ error: 'API call failed', details: data });
    }
    
    if (!data || !data.response) {
      return res.status(500).json({ error: 'Invalid API response' });
    }

    const matches = data.response.map((match) => ({
      teams: `${match.teams.home.name} vs ${match.teams.away.name}`,
      date: match.fixture.date,
    }));

    res.json(matches);
  } catch (error) {
    console.error('Fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}/api/matches`);
});
