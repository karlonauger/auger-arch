import React from 'react';

export default function GameOverMenu({ handleRestartClick }) {
  return (
    <div
      id="game-over"
      className="position-absolute top-50 start-50 translate-middle"
    >
      <form>
        <h4 className="text-danger">GAME OVER</h4>
        <button type="button" className="btn btn-primary" onClick={handleRestartClick}>
          Restart
        </button>
      </form>
    </div>
  );
}
