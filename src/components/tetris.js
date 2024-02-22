import React, { useEffect, useState } from 'react';

import TopScores from './topScores';
import TetrisGame from '../tetris/tetrisGame';

const Tetris = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOverFlag, setGameOverFlag] = useState(false);
  const [tetrisGame, setTetrisGame] = useState(null);
  const [gameCount, setGameCount] = useState(0); // Triggers TopScores refresh

  useEffect(() => {
    const game = new TetrisGame('tetrisCanvas', 'nextPieceCanvas', gameOver)
    game.init();

    setTetrisGame(game);
  }, []);

  useEffect(() => {
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');

    startButton.addEventListener('click', handleStartClick);
    restartButton.addEventListener('click', handleRestartClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      startButton.removeEventListener('click', handleStartClick);
      restartButton.removeEventListener('click', handleRestartClick);
    };
  }, [tetrisGame, playerName]);

  const handleStartClick = () => {
    // Validate player name
    if (playerName.trim() === '') {
      alert('Please enter a valid player name.');
      return;
    }

    findOrCreatePlayer(playerName).then((player) => {
      setGameStarted(true); // Hide game menu

      tetrisGame.startGame(player);
    });    
  };

  const handleRestartClick = () => {
    setGameOverFlag(false); // Hide game over

    tetrisGame.restartGame();
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleStartClick();
    }
  };

  const handleNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  const gameOver = (player, score, level) => {
    postScore(player, score, level);

    setGameOverFlag(true);
  }

  const findOrCreatePlayer = async (name) => {
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
  
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  const postScore = async (player, score, level) => {
    try {
      const scoreResponse = await fetch('http://localhost:5000/add-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: player._id, score: score, level: level })
      });

      if (!scoreResponse.ok) {
        throw new Error(`HTTP error! Status: ${scoreResponse.status}`);
      }

      await scoreResponse.json().then(() => {
        // Game count triggers Top Score to update
        setGameCount((prevGameCount) => prevGameCount + 1);
      });
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
              } style={{ marginTop: '40px' }}>
                <form>
                  <div className="mb-3 mt-10">
                    <label htmlFor="playerName" className="form-label mt-10">Enter your name:</label>
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
                  >Start</button>
                </form>
              </div>
              <div id="game-over" className={
                `position-absolute top-50 start-50 translate-middle ${!gameOverFlag ? 'd-none' : ''}`
              }>
                <form>
                  <h4 className="text-danger">GAME OVER</h4>
                  <button
                    id="restartButton"
                    type="button"
                    className="btn btn-primary"
                  >Restart</button>
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
