import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { config } from '../config'
import Score from './score';

export default function TopScores({ onScoreUpdate }) {
  const [scores, setTopScores] = useState([]);

  useEffect(() => {
    async function getTopScores() {
      const response = await fetch(`${config.apiEndpoint}/top-scores?limit=8`);

      if (!response.ok) {
        console.log(`An error occurred: ${response.statusText}`);
        return;
      }

      const rawScores = await response.json();

      // Fetch user details for each score
      const scoresWithUserDetails = await Promise.all(
        rawScores.map(async (score) => {
          const userResponse = await fetch(`${config.apiEndpoint}/user/${score.user}`);
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
