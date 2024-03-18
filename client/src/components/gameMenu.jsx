import React from 'react';

export default function GameMenu({ playerName, setPlayerName, handleStartClick, handleKeyDown }) {
  return (
    <div
      id="game-menu"
      className="position-absolute top-50 start-50 translate-middle"
      style={{ marginTop: '40px' }}
    >
      <form>
        <div className="mb-3 mt-10">
          <label htmlFor="playerName" className="form-label mt-10">
            Enter your name:
            <input
              id="playerName"
              type="text"
              className="form-control"
              placeholder="Player Name"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
              onKeyDown={handleKeyDown}
            />
          </label>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleStartClick}>
          Start
        </button>
      </form>
    </div>
  );
}
