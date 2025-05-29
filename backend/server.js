// backend/server.js
require('dotenv').config();
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/matches', async (req, res) => {
  try {
    const response = await fetch('https://api.football-data.org/v4/matches', {
      method: 'GET',
      headers: {
        'X-Auth-Token': process.env.API_KEY  // Your Football-Data.org API key
      }
    });

    const data = await response.json();

    if (!data.matches) {
      return res.status(500).json({ error: 'Invalid response from Football-Data.org' });
    }

    const matches = data.matches.map(match => ({
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      date: match.utcDate
    }));

    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
