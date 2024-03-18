import React, { useEffect, useState } from 'react';

import { fetchData } from '../services/apiService';
import TopScores from './topScores';
import GameMenu from './gameMenu';
import GameOverMenu from './gameOverMenu';
import TetrisGame from '../tetris/tetrisGame';

export default function Tetris() {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOverFlag, setGameOverFlag] = useState(false);
  const [tetrisGame, setTetrisGame] = useState(null);
  const [gameCount, setGameCount] = useState(0); // Triggers TopScores refresh

  const findOrCreatePlayer = async (name) => {
    try {
      // Find or create user
      const playerData = await fetchData(`/find-or-create-user/${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return playerData;
    } catch (error) {
      console.error("Error finding or creating player:", error);
    }
  };

  const postScore = async (player, score, level) => {
    try {
      const scoreResponse = await fetchData(`/add-score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // eslint-disable-next-line no-underscore-dangle
        body: JSON.stringify({ userId: player._id, score, level }),
      });

      // Game count triggers Top Score to update
      setGameCount((prevGameCount) => prevGameCount + 1);
    } catch (error) {
      console.error("Error posting player score:", error);
    }
  };

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
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleStartClick();
    }
  };

  const gameOver = (player, score, level) => {
    postScore(player, score, level);

    setGameOverFlag(true);
  };

  useEffect(() => {
    const game = new TetrisGame('tetrisCanvas', 'nextPieceCanvas', gameOver);
    game.init();

    setTetrisGame(game);
  }, []);

  return (
    <div id="tetris" className="jumbotron">
      <div className="position-relative container my-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <div className="row">
            <div
              className="col-md-4 position-relative"
              style={{ minWidth: '262px', maxHeight: '400px' }}
            >
              <canvas id="tetrisCanvas" width="240" height="400" />
              {!gameStarted && (
                <GameMenu
                  playerName={playerName}
                  setPlayerName={setPlayerName}
                  handleStartClick={handleStartClick}
                  handleKeyDown={handleKeyDown}
                />
              )}
              {gameOverFlag && (
                <GameOverMenu handleRestartClick={handleRestartClick} />
              )}
            </div>
            <div className="col-md-4 text-start">
              <div id="game-stats" className={!gameStarted ? 'd-none' : ''}>
                <h5>Next Piece</h5>
                <canvas id="nextPieceCanvas" width="80" height="80" />
                <h5>Player: <span id="player">{playerName}</span></h5>
                <h5>Score: <span id="score">0</span></h5>
                <h5>Level: <span id="level">0</span></h5>
                <h5>Lines: <span id="lines">0</span></h5>
              </div>
              <div id="game-controls" className={gameStarted ? 'd-none' : ''}>
                <h5>Controls</h5>
                <p>
                  Rotate Clockwise - Z Key / Up Arrow<br />
                  Rotate Couter Clockwise - X Key<br />
                  Move Left - Left Arrow<br />
                  Move Right - Right Arrow<br />
                  Soft Drop - Down Arrow<br />
                  Hard Drop - Space Bar
                </p>
              </div>
              <hr className="my-2" />
              <p className="mx-auto text-muted">
                A JavaScript remake of the classic Tetris game. Scores are recorded by a Node.js
                server in a MongoDB. I wanted to include the Java version I made in High School, but
                browser support for Java is limited. Please enjoy :)
              </p>
              <div className="d-inline-flex gap-2 mb-3">
                <a
                  className="btn btn-primary"
                  href="https://github.com/karlonauger/auger-arch/tree/master/client/src/tetris"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                >
                  JS Code
                </a>
                <a
                  className="btn btn-primary"
                  href="https://github.com/karlonauger/tetris"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                >
                  Java Code
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <TopScores onScoreUpdate={gameCount} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
