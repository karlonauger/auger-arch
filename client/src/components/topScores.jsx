import React from 'react';
import PropTypes from 'prop-types';
import useTopScores from '../hooks/useTopScores';
import Score from './score';

export default function TopScores({ scoreUpdateTrigger }) {
  const scores = useTopScores(scoreUpdateTrigger);

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
        <tbody>
          {scores.map((score) => <Score score={score} key={score._id} />)}
        </tbody>
      </table>
    </div>
  );
}

TopScores.propTypes = {
  scoreUpdateTrigger: PropTypes.number.isRequired,
};
