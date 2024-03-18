import React from 'react';

export default function GameStats({ playerName, score, level, lines }) {
  return (
    <div>
      <h5>Next Piece</h5>
      <canvas id="nextPieceCanvas" width="80" height="80" />
      <h5>Player: {playerName}</h5>
      <h5>Score: {score}</h5>
      <h5>Level: {level}</h5>
      <h5>Lines: {lines}</h5>
    </div>
  );
}
