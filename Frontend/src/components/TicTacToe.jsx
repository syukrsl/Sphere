import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ user: 0, computer: 0 });
  const [round, setRound] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setRound(1);
    setBoard(Array(9).fill(null));
    setWinner(null);
    setScore({ user: 0, computer: 0 });
  };

  useEffect(() => {
    if (!xIsNext && !winner && gameStarted) {
      setTimeout(() => {
        makeComputerMove();
      }, 500);
    }
  }, [xIsNext, winner, gameStarted]);

  useEffect(() => {
    const calculatedWinner = calculateWinner(board);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
      // Check if the round is over
      if (score.user === 1 || score.computer === 1 || board.every((square) => square)) {
        setTimeout(() => {
          if (round < 5) {
            setRound(round + 1);
            setBoard(Array(9).fill(null));
            setWinner(null);
            setXIsNext(true);
            // Reset the score for the next round
            setScore({ user: 0, computer: 0 });
          }
        }, 1000); // Delay before starting the next round
      } else {
        // Update score for the round
        if (calculatedWinner === 'X') {
          setScore({ ...score, user: score.user + 1 });
        } else if (calculatedWinner === 'O') {
          setScore({ ...score, computer: score.computer + 1 });
        }
      }
    }
  }, [board, round, score, gameStarted]);

  const makeComputerMove = () => {
    const availableSquares = board.map((value, index) => (value === null ? index : null)).filter((index) => index !== null);

    if (availableSquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableSquares.length);
      const computerMove = availableSquares[randomIndex];

      const newBoard = [...board];
      newBoard[computerMove] = 'O';
      setBoard(newBoard);
      setXIsNext(true);
    }
  };

  const handleClick = (i) => {
    if (board[i] || winner || !gameStarted) {
      return;
    }

    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => handleClick(i)}>
        {board[i]}
      </button>
    );
  };

  const getStatus = () => {
    if (!gameStarted) {
      return '';
    }
    if (winner) {
      return `Round ${round}: ${winner === 'X' ? 'User Wins!' : winner === 'O' ? 'Computer Wins!' : 'Draw!'}`;
    } else if (board.every((square) => square)) {
      return `Round ${round}: Draw!`;
    } else {
      return `Round ${round}: Next player: ${xIsNext ? 'User (X)' : 'Computer (O)'}`;
    }
  };

  const getFinalResult = () => {
    if (round > 5) {
      if (score.user > score.computer) {
        return 'User Wins!';
      } else if (score.user < score.computer) {
        return 'Computer Wins!';
      } else {
        return 'Draw!';
      }
    }
    return '';
  };

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{getStatus()}</div>
        <div className="board-row">{renderSquare(0)}{renderSquare(1)}{renderSquare(2)}</div>
        <div className="board-row">{renderSquare(3)}{renderSquare(4)}{renderSquare(5)}</div>
        <div className="board-row">{renderSquare(6)}{renderSquare(7)}{renderSquare(8)}</div>
      </div>
      {!gameStarted && <button onClick={startGame}>Play a Round of 5</button>}
      <table className="scoreboard">
        <thead>
          <tr>
            <th>Round</th>
            <th>User</th>
            <th>Computer</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }, (_, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{index < round ? score.user : '-'}</td>
              <td>{index < round ? score.computer : '-'}</td>
            </tr>
          ))}
          <tr>
            <td>Final</td>
            <td>{round > 5 ? score.user : '-'}</td>
            <td>{round > 5 ? score.computer : '-'}</td>
          </tr>
          <tr>
            <td>Result</td>
            <td colSpan="2">{round > 5 ? getFinalResult() : '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default TicTacToe;
