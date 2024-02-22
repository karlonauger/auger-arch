import React, { useEffect, useState } from 'react';

import TopScores from './topScores';
import TetrisGame from '../tetris/tetrisGame';

const Tetris = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [tetrisGame, setTetrisGame] = useState(null);
  const [gameCount, setGameCount] = useState(0); // Triggers TopScores refresh

  useEffect(() => {
    const game = new TetrisGame('tetrisCanvas', 'nextPieceCanvas', postScore)
    game.init();

    setTetrisGame(game);
  }, []);

  useEffect(() => {
    const startButton = document.getElementById('startButton');

    startButton.addEventListener('click', handleStartClick);

    // Cleanup the event listener when the component unmounts
    return () => { startButton.removeEventListener('click', handleStartClick); };
  }, [tetrisGame, playerName]);

  const handleStartClick = () => {
    // Validate player name
    if (playerName.trim() === '') {
      alert('Please enter a valid player name.');
      return;
    }
    
    setGameStarted(true); // Hide game menu
    
    tetrisGame.startGame(playerName);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleStartClick();
    }
  };

  const handleNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  const postScore = async (name, score, level) => {
    try {
      // Find or create user
      const response = await fetch(`http://localhost:5000/find-or-create-user/${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const user = await response.json();
  
      // Add score for the user
      const scoreResponse = await fetch('http://localhost:5000/add-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id, score: score, level: level })
      });

      if (!scoreResponse.ok) {
        throw new Error(`HTTP error! Status: ${scoreResponse.status}`);
      }

      await scoreResponse.json();

      setGameCount((gameCount) => { gameCount++; });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="jumbotron">
      <div id="tetris" className="position-relative container my-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <div className="row">
            <div className="col-md-3 position-relative">
              <canvas id="tetrisCanvas" width="240" height="400"></canvas>
              <div id="game-menu" className={
                `position-absolute top-50 start-50 translate-middle ${gameStarted ? 'd-none' : ''}`
              }>
                <h1>Tetris</h1>
                <form>
                  <div className="mb-3">
                    <label htmlFor="playerName" className="form-label">Enter your name:</label>
                    <input 
                      id="playerName"
                      type="text"
                      className="form-control"
                      placeholder="Player Name"
                      value={playerName}
                      onChange={handleNameChange}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  <button
                    id="startButton"
                    type="button"
                    className="btn btn-primary"
                  >Start Game</button>
                </form>
              </div>
            </div>
            <div className="col-md-5 text-start">
              <div id="game-stats" className={!gameStarted ? 'd-none' : ''}>
                <h5>Player: <span id="player">{playerName}</span></h5>
                <h5>Score: <span id="score">0</span></h5>
                <h5>Level: <span id="level">0</span></h5>
                <h5>Lines: <span id="lines">0</span></h5>
                <h5>Next Piece</h5>
                <canvas id="nextPieceCanvas" width="80" height="80"></canvas>
              </div>
              <div id="game-controls" className={gameStarted ? 'd-none' : ''}>
                <h5>Controls</h5>
                <p>
                  Rotate Clockwise - Z Key / Up Arrow<br/>
                  Rotate Couter Clockwise - X Key<br/>
                  Move Left - Left Arrow<br/>
                  Move Right - Right Arrow<br/>
                  Soft Drop - Down Arrow<br/>
                  Hard Drop - Space Bar
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <TopScores onScoreUpdate={gameCount}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tetris;
