const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const FOOTBALL_DATA_BASE_URL = 'https://api.football-data.org/v4/';
const API_KEY = process.env.FOOTBALL_DATA_KEY;

app.use(cors());
app.use(express.json());

app.get('/api/matches', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ error: 'Football-Data.org API key not configured.' });
  }

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 10);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  try {
    const response = await axios.get(`${FOOTBALL_DATA_BASE_URL}matches`, {
      headers: {
        'X-Auth-Token': API_KEY,
      },
      params: {
        dateFrom: formatDate(startDate),
        dateTo: formatDate(endDate),
        status: 'SCHEDULED',
      },
    });

    const matches = response.data.matches;

    console.log('First match data from Football-Data.org:', matches[0]);

    const upcomingMatches = matches.map((match) => {
      const homeTeamName = match.homeTeam.name;
      const awayTeamName = match.awayTeam.name;
      const matchDateTime = match.utcDate;
      const leagueName = match.competition ? match.competition.name : 'Unknown League';

      return {
        id: match.id,
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        dateTime: matchDateTime,
        league: leagueName,
      };
    });

    res.json(upcomingMatches);
  } catch (error) {
    console.error('Error fetching matches:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({
      error: 'Failed to fetch matches from API.',
      details: error.response ? error.response.data : error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});