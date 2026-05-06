import React, { useState, useEffect, useCallback } from "react";
import { RotateCcw, Play } from "lucide-react";

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const GRID_SIZE = 20;

  const generateFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    if (newFood.x === food.x && newFood.y === food.y) {
      return generateFood();
    }
    return newFood;
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setFood(generateFood());
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  const handleKeyDown = useCallback((e) => {
    if (gameOver) return;
    
    switch (e.key) {
      case "ArrowUp":
        if (direction.y === 0) setDirection({ x: 0, y: -1 });
        break;
      case "ArrowDown":
        if (direction.y === 0) setDirection({ x: 0, y: 1 });
        break;
      case "ArrowLeft":
        if (direction.x === 0) setDirection({ x: -1, y: 0 });
        break;
      case "ArrowRight":
        if (direction.x === 0) setDirection({ x: 1, y: 0 });
        break;
      case " ":
        setIsPaused((prev) => !prev);
        break;
      default:
        break;
    }
  }, [direction, gameOver]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y,
        };

        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE ||
          prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
        ) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((prev) => prev + 1);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 120);

    return () => clearInterval(moveSnake);
  }, [direction, food, gameOver, isPaused]);

  return (
    <div className="w-full h-full bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-white mb-1">Snake</h2>
        <p className={`text-sm px-3 py-1 rounded-full inline-block backdrop-blur-sm ${
          gameOver
            ? "bg-red-500/20 text-red-300 border border-red-500/30"
            : isPaused
              ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
              : "bg-white/10 text-gray-300 border border-white/10"
        }`}>
          {gameOver ? `Game Over! Score: ${score}` : isPaused ? "Paused (Space)" : `Score: ${score}`}
        </p>
      </div>

      <div className="relative bg-white/5 border border-white/10 rounded-lg p-2 mb-4">
        <div 
          className="grid gap-px bg-white/10"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: "min(40vw, 320px)",
            height: "min(40vw, 320px)"
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isSnake = snake.some((s) => s.x === x && s.y === y);
            const isHead = snake[0]?.x === x && snake[0]?.y === y;
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={i}
                className={`
                  ${isSnake ? "bg-green-400" : ""} 
                  ${isHead ? "bg-green-300 ring-2 ring-green-200/50" : ""}
                  ${isFood ? "bg-red-400 rounded-sm" : ""}
                  ${!isSnake && !isFood ? "bg-white/5" : ""}
                `}
              />
            );
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            resetGame();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
                     text-white rounded-full border border-white/10 backdrop-blur-sm
                     transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <RotateCcw size={16} />
          <span className="text-sm font-medium">Restart</span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPaused((prev) => !prev);
          }}
          disabled={gameOver}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
                     text-white rounded-full border border-white/10 backdrop-blur-sm
                     transition-all duration-200 hover:scale-105 active:scale-95
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={16} />
          <span className="text-sm font-medium">{isPaused ? "Resume" : "Pause"}</span>
        </button>
      </div>

      <p className="text-[10px] text-gray-500 mt-4">Use Arrow Keys to move • Space to pause</p>
    </div>
  );
};

export default SnakeGame;