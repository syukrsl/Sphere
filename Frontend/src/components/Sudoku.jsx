import React, { useState, useEffect } from 'react';
import './Sudoku.css';

function Sudoku() {
  const [board, setBoard] = useState(Array(9).fill(null).map(() => Array(9).fill('')));
  const [originalBoard, setOriginalBoard] = useState(Array(9).fill(null).map(() => Array(9).fill('')));
  const [selectedCell, setSelectedCell] = useState(null);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    const puzzle = generateSudoku();
    setBoard(puzzle);
    setOriginalBoard(puzzle);
  }, []);

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  const handleNumberClick = (number) => {
    if (selectedCell !== null && originalBoard[selectedCell.row][selectedCell.col] === '' && !isSolved) {
      const newBoard = board.map((row) => [...row]);
      newBoard[selectedCell.row][selectedCell.col] = number;
      setBoard(newBoard);
    }
  };

  const handleClearClick = () => {
    if (selectedCell !== null && originalBoard[selectedCell.row][selectedCell.col] === '' && !isSolved) {
      const newBoard = board.map((row) => [...row]);
      newBoard[selectedCell.row][selectedCell.col] = '';
      setBoard(newBoard);
    }
  };

  const handleRestartClick = () => {
    // Reset the game board
    const puzzle = generateSudoku();
    setBoard(puzzle);
    setOriginalBoard(puzzle);
    setSelectedCell(null);
    setIsSolved(false);
  };

  const renderCell = (value, row, col) => {
    const isOriginal = originalBoard[row][col] !== '';
    const isSelected =
      selectedCell !== null && selectedCell.row === row && selectedCell.col === col;
    let classes = `cell ${isOriginal ? 'original' : ''} ${isSelected ? 'selected' : ''}`;
    
    // Check for repeated numbers in 3x3 boxes and add the 'wrong' class to highlight in red
    if (!isOriginal && value !== '' && !isValidMove(row, col, value)) {
      classes += ' wrong';
    }

    const boxRow = Math.floor(row / 3);
    const boxCol = Math.floor(col / 3);
    classes += ` box-${boxRow}-${boxCol}`;

    return (
      <div
        key={row * 9 + col}
        className={classes}
        onClick={() => handleCellClick(row, col)}
      >
        {value || ''}
      </div>
    );
  };

  const renderNumberButton = (number) => {
    return (
      <button key={number} className="number-button" onClick={() => handleNumberClick(number)}>
        {number}
      </button>
    );
  };

  const renderClearButton = () => {
    return (
      <button className="clear-button" onClick={handleClearClick}>
        Clear
      </button>
    );
  };

  function generateSudoku() {
    // Generate a Sudoku puzzle (replace this with your own logic)
    // For simplicity, I'll provide a pre-generated puzzle here

    const puzzle = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ];

    return puzzle.map((row) => row.map((value) => (value === 0 ? '' : value)));
  }

  function isValidMove(row, col, num) {
    // Check if the number is already present in the row, column, or 3x3 box
    return (
      !checkRow(row, num) &&
      !checkColumn(col, num) &&
      !check3x3Box(row - (row % 3), col - (col % 3), num)
    );
  }

  function checkRow(row, num) {
    return board[row].includes(num);
  }

  function checkColumn(col, num) {
    return board.some((row) => row[col] === num);
  }

  function check3x3Box(boxRow, boxCol, num) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) {
          return true;
        }
      }
    }
    return false;
  }

  return (
    <div className="sudoku">
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => renderCell(value, rowIndex, colIndex))
        )}
      </div>
      <div className="number-buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => renderNumberButton(number))}
        {renderClearButton()}
      </div>
      {isSolved && <div className="solved-message">Sudoku Solved!</div>}

      <button className="restart-button" onClick={handleRestartClick}>
        Restart
      </button>
    </div>
  );
}

export default Sudoku;
