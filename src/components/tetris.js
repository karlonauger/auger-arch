import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import TopScores from './topScores';
import Edit from './edit';
import Create from './create';
import TetrisGame from '../tetris/tetrisGame';

const Tetris = () => {
  useEffect(() => {
    const tetrisGame = new TetrisGame('tetrisCanvas');
    tetrisGame.init();
  }, []);

  return (
    <div className="jumbotron">
      <div id="tetris" className="position-relative container my-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <div className="row">
            <div className="col-md-3">
              <canvas id="tetrisCanvas" width="240" height="400"></canvas>
            </div>
            <div className="col-md-3">
              <h3>Score: <span id="score">0</span></h3>
              <h3>Level: <span id="level">1</span></h3>
              <h3>Lines: <span id="lines">0</span></h3>
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
