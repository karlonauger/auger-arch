import React from 'react';
import PropTypes from 'prop-types';

export default function Score({ score }) {
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
