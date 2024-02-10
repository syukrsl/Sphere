import React, { useState, useEffect, useRef } from 'react';
import './SnakeGame.css';

const gridSize = 20;
const initialSnake = [{ x: 8, y: 8 }];
const initialFood = { x: 16, y: 8 };
const directions = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

function SnakeGame() {
  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState(initialFood);
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const moveSnakeRef = useRef();
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (snake.length) {
      const handleKeydown = (e) => {
        const newDir = directions[e.key];
        if (newDir) {
          // Prevent the snake from reversing onto itself
          if (-newDir.x !== dir.x && -newDir.y !== dir.y) {
            setDir(newDir);
          }
        }
      };

      document.addEventListener('keydown', handleKeydown);
      moveSnakeRef.current = setInterval(moveSnake, 100);

      return () => {
        document.removeEventListener('keydown', handleKeydown);
        clearInterval(moveSnakeRef.current);
      };
    }
  }, [snake, dir]);

  const startGame = () => {
    setSnake(initialSnake);
    setFood({ x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) });
    setDir({ x: 1, y: 0 });
    setGameOver(false);
    setScore(0);
  };

  const moveSnake = () => {
    setSnake((prevSnake) => {
      let newHead = { x: prevSnake[0].x + dir.x, y: prevSnake[0].y + dir.y };

      // Check for collisions
      if (
        newHead.x < 0 || newHead.x >= gridSize || 
        newHead.y < 0 || newHead.y >= gridSize || 
        prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        clearInterval(moveSnakeRef.current);
        setGameOver(true);
        return []; // Reset snake
      }

      // Check for food
      if (newHead.x === food.x && newHead.y === food.y) {
        setFood({ x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) });
        setScore(score + 1);
        return [newHead, ...prevSnake];
      }

      return [newHead, ...prevSnake.slice(0, -1)];
    });
  };

  return (
    <div className="snake-game-container">
      <div className="snake-game" tabIndex="0">
        {Array.from({ length: gridSize }, (_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: gridSize }, (_, colIndex) => {
              const isSnake = snake.some(segment => segment.x === colIndex && segment.y === rowIndex);
              const isFood = food.x === colIndex && food.y === rowIndex;

              return (
                <div key={colIndex} className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}></div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="score-display">
        <button className="score-button">Score: {score}</button>
      </div>
      {!snake.length && !gameOver && (
        <button className="start-button" onClick={startGame}>Start Game</button>
      )}
      {gameOver && (
        <>
          <div className="game-over-message">Game Over!</div>
          <button className="restart-button" onClick={startGame}>Restart Game</button>
        </>
      )}
    </div>
  );
}

export default SnakeGame;
