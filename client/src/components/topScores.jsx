import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

function Score({ score }) {
  return (
    <tr>
      <td>{score.userDetails.username}</td>
      <td>{score.score}</td>
      <td>{score.level}</td>
    </tr>
  );
}
Score.propTypes = {
  score: PropTypes.shape({
    userDetails: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
    score: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
  }).isRequired,
};

function TopScores({ onScoreUpdate }) {
  const [scores, setTopScores] = useState([]);

  useEffect(() => {
    async function getTopScores() {
      const response = await fetch('http://localhost:5000/top-scores?limit=8');

      if (!response.ok) {
        console.log(`An error occurred: ${response.statusText}`);
        return;
      }

      const rawScores = await response.json();

      // Fetch user details for each score
      const scoresWithUserDetails = await Promise.all(
        rawScores.map(async (score) => {
          const userResponse = await fetch(`http://localhost:5000/user/${score.user}`);
          if (!userResponse.ok) {
            throw new Error('Failed to fetch user details');
          }

          const userData = await userResponse.json();
          return { ...score, userDetails: userData };
        }),
      );

      setTopScores(scoresWithUserDetails);
    }
    getTopScores();
  }, [onScoreUpdate]);

  function topScores() {
    return scores.map((score) => (
      // eslint-disable-next-line no-underscore-dangle
      <Score score={score} key={score._id} />
    ));
  }

  return (
    <div className="position-relative">
      <table className="table table-striped text-start">
        <thead>
          <tr>
            <th>Player</th>
            <th>High Score</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>{topScores()}</tbody>
      </table>
    </div>
  );
}
TopScores.propTypes = {
  onScoreUpdate: PropTypes.number.isRequired,
};

export default TopScores;
