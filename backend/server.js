const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.use(cors());

let fetch;

(async () => {
  const nodeFetch = await import('node-fetch');
  fetch = nodeFetch.default;
})();

let lastGoals = {};

const getLiveMatches = async () => {
  const url = 'https://v3.football.api-sports.io/fixtures?live=all';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'cc75ed977b6ff2922bde04c86f092d58',
      'X-RapidAPI-Host': 'v3.football.api-sports.io'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.response;
  } catch (error) {
    console.error('Error fetching live matches:', error);
    throw error;
  }
};

const hasGoalsChanged = (prevGoals, currentGoals) => {
  if (!prevGoals || !currentGoals) return true;
  return prevGoals.home !== currentGoals.home || prevGoals.away !== currentGoals.away;
};

io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);

  const interval = setInterval(async () => {
    try {
      const matches = await getLiveMatches();

      let hasChanges = false;
      const updatedGoals = {};

      matches.forEach(match => {
        const matchId = match.fixture.id;
        const currentGoals = {
          home: match.goals.home,
          away: match.goals.away
        };

        if (hasGoalsChanged(lastGoals[matchId], currentGoals)) {
          updatedGoals[matchId] = currentGoals;
          hasChanges = true;
        }
      });

      if (hasChanges) {
        lastGoals = { ...lastGoals, ...updatedGoals };
        io.emit('live-matches', matches);
        console.log('Updated matches with goals:', matches);
      } else {
        console.log('No goal changes.');
      }
    } catch (error) {
      console.error('Error fetching live matches:', error);
    }
  }, 1500);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
