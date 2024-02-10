// ClassicGames.jsx
import React, { useState } from 'react';
import './ClassicGames.css';
import Sudoku from './Sudoku';
import SnakeGame from './SnakeGame';
import TicTacToe from './TicTacToe';

function ClassicGames() {
  const [activeTab, setActiveTab] = useState('Sudoku');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="classic-games-container">
      <h1 className="game-header">Classic Games</h1>
      <div className="tabs">
        <label className={`tab ${activeTab === 'Sudoku' ? 'active' : ''}`} onClick={() => handleTabChange('Sudoku')}>Sudoku</label>
        <label className={`tab ${activeTab === 'SnakeGame' ? 'active' : ''}`} onClick={() => handleTabChange('SnakeGame')}>Snake Game</label>
        <label className={`tab ${activeTab === 'TicTacToe' ? 'active' : ''}`} onClick={() => handleTabChange('TicTacToe')}>Tic-Tac-Toe</label>
      </div>
      <div className="panels">
        <div className={`panel ${activeTab === 'Sudoku' ? 'active' : ''}`} id="sudoku-panel">
          <Sudoku />
        </div>
        <div className={`panel ${activeTab === 'SnakeGame' ? 'active' : ''}`} id="snake-panel">
          <SnakeGame />
        </div>
        <div className={`panel ${activeTab === 'TicTacToe' ? 'active' : ''}`} id="tic-tac-toe-panel">
          <TicTacToe />
        </div>
      </div>
    </div>
  );
}

export default ClassicGames;
