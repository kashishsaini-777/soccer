// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/matches')
      .then(res => res.json())
      .then(data => setMatches(data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div className="App">
      <h1>Upcoming Soccer Matches</h1>
      {matches.map((match, idx) => (
        <div key={idx} className="match">
          <strong>{match.title}</strong><br />
          <em>{new Date(match.date).toLocaleString()}</em>
        </div>
      ))}
    </div>
  );
}

export default App;
