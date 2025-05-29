// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { motion } from 'framer-motion';

function App() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/api/matches')
      .then(res => {
        setMatches(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load matches');
        setLoading(false);
      });
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="app">
      <motion.header 
        className="header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>⚽ LIVE SOCCER MATCH</h1>
        <p>Live and upcoming fixtures</p>
      </motion.header>

      {loading ? (
        <p className="status">Loading...</p>
      ) : error ? (
        <p className="status error">{error}</p>
      ) : matches.length === 0 ? (
        <p className="status">No matches found.</p>
      ) : (
        <motion.ul 
          className="match-list"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {matches.map((match, index) => (
            <motion.li
              className="match-card"
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <div className="teams">
                <span className="team">{match.homeTeam}</span>
                <span className="vs">vs</span>
                <span className="team">{match.awayTeam}</span>
              </div>
              <div className="datetime">
                {new Date(match.date).toLocaleString()}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

export default App;
