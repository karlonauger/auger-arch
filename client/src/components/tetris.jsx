import React, { useReducer, useEffect, useRef } from 'react';
import { gameReducer, initialState } from '../reducers/gameReducer';
import { SET_PLAYER_NAME, START_GAME, END_GAME, RESTART_GAME, UPDATE_SCORE } from '../actions/gameActions';
import { findOrCreatePlayer, postScore } from '../services/gameService';
import TopScores from './topScores';
import GameMenu from './gameMenu';
import GameStats from './gameStats';
import GameOverMenu from './gameOverMenu';
import TetrisGame from '../tetris/tetrisGame';

export default function Tetris() {
  const game = useRef(null);
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { playerName, gameStarted, gameOver, score, level, lines, gameCount } = state;

  useEffect(() => {
    game.current = new TetrisGame('tetrisCanvas', 'nextPieceCanvas');
    game.current.init();
  }, []);

  const setPlayerName = (name) => {
    dispatch({ type: SET_PLAYER_NAME, payload: name });
  };

  const setScore = (score, level, lines) => {
    dispatch({ type: UPDATE_SCORE, payload: { score, level, lines } });
  };

  const setGameOver = async (player, score, level) => {
    await postScore(player, score, level);

    dispatch({ type: END_GAME });
  };

  const handleStartClick = async () => {
    // Validate player name
    if (playerName.trim() === '') {
      alert('Please enter a valid player name.');
      return;
    }

    const player = await findOrCreatePlayer(playerName)
    dispatch({ type: START_GAME, payload: player });
    game.current.startGame(player, setScore, setGameOver);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleStartClick();
    }
  };

  const handleRestartClick = () => {
    dispatch({ type: RESTART_GAME });

    game.current.restartGame();
  };

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
              {gameOver && (
                <GameOverMenu handleRestartClick={handleRestartClick} />
              )}
            </div>
            <div className="col-md-4 text-start">
              <div className={!gameStarted ? 'd-none' : ''}>
                <GameStats playerName={playerName} score={score} level={level} lines={lines} />
              </div>
              <div className={gameStarted ? 'd-none' : ''}>
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
              <TopScores scoreUpdateTrigger={gameCount} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
