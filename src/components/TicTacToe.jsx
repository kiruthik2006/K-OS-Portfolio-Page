import React, { useState } from "react";
import { RotateCcw, X, Circle } from "lucide-react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);

  const handleClick = (i) => {
    console.log("Clicked cell:", i, "board:", board[i]);
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const getStatus = () => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return "It's a Draw!";
    return `Player: ${xIsNext ? "X" : "O"}`;
  };

  const getWinningLine = () => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return [a, b, c];
      }
    }
    return null;
  };

  const winningCells = getWinningLine();

  return (
    <div className="w-full h-full bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">Tic Tac Toe</h2>
        <p className={`text-sm font-medium px-4 py-1.5 rounded-full inline-block backdrop-blur-sm ${
          winner 
            ? "bg-green-500/20 text-green-300 border border-green-500/30" 
            : isDraw 
              ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
              : "bg-white/10 text-gray-300 border border-white/10"
        }`}>
          {getStatus()}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(i);
            }}
            className={`
              w-20 h-20 rounded-xl flex items-center justify-center transition-all duration-300
              ${winningCells?.includes(i) 
                ? "bg-green-500/30 ring-2 ring-green-400/50" 
                : cell 
                  ? "bg-white/10" 
                  : "bg-white/5 hover:bg-white/15 hover:scale-105 cursor-pointer active:scale-95"
              }
            `}
          >
            {cell === "X" && <X size={44} className="text-red-400 drop-shadow-lg" strokeWidth={2.5} />}
            {cell === "O" && <Circle size={44} className="text-cyan-400 drop-shadow-lg" strokeWidth={2.5} />}
          </button>
        ))}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          resetGame();
        }}
        className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 
                   text-white rounded-full border border-white/10 backdrop-blur-sm
                   transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <RotateCcw size={18} />
        <span className="text-sm font-semibold">Restart</span>
      </button>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;