import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import TopScores from './topScores';
import Edit from './edit';
import Create from './create';
import TetrisGame from '../tetris/tetrisGame';

const Tetris = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [tetrisGame, setTetrisGame] = useState('');

  useEffect(() => {
    const game = new TetrisGame('tetrisCanvas', 'nextPieceCanvas')
    game.init();

    setTetrisGame(game);
  }, []);

  useEffect(() => {
    const startButton = document.getElementById('startButton');
    const handleStartClick = () => {
      // Validate player name
      console.log(playerName);
      if (playerName.trim() === '') {
        alert('Please enter a valid player name.');
        return;
      }
      
      setGameStarted(true); // Hide game menu
      
      tetrisGame.update();
    };

    startButton.addEventListener('click', handleStartClick);

    // Cleanup the event listener when the component unmounts
    return () => { startButton.removeEventListener('click', handleStartClick); };
  }, [tetrisGame, playerName]);

  const handleNameChange = (event) => {
    setPlayerName(event.target.value);
  };

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
            <div className="col-md-3 text-start">
              <div id="game-stats" className={!gameStarted ? 'd-none' : ''}>
                <h5>Player: <span id="player">{playerName}</span></h5>
                <h5>Score: <span id="score">0</span></h5>
                <h5>Level: <span id="level">0</span></h5>
                <h5>Lines: <span id="lines">0</span></h5>
                <h5>Next Piece</h5>
                <canvas id="nextPieceCanvas" width="80" height="80"></canvas>
              </div>
            </div>
            <div className="col-md-6">
              <Routes>
                <Route exact path="/" element={<TopScores />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/create" element={<Create />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tetris;
