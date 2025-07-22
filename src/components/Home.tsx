import { useState, useCallback, useMemo } from "react";

type Player = "X" | "O";
type Square = Player | null;
type Board = Square[];
type Winner = Player | "Draw" | null;

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

const INITIAL_BOARD: Board = Array(9).fill(null);

export default function Home() {
  const [board, setBoard] = useState<Board>(INITIAL_BOARD);
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const winner = useMemo((): Winner => {
    for (const [a, b, c] of WINNING_LINES) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] as Player;
      }
    }
    
    if (board.every(square => square !== null)) {
      return "Draw";
    }
    
    return null;
  }, [board]);

  const currentPlayer = xIsNext ? "X" : "O";
  const isGameActive = winner === null;

  const handleSquareClick = useCallback((index: number) => {
    if (board[index] || !isGameActive) return;

    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      newBoard[index] = currentPlayer;
      return newBoard;
    });

    setXIsNext(prev => !prev);
  }, [board, isGameActive, currentPlayer]);

  const resetGame = useCallback(() => {
    setBoard(INITIAL_BOARD);
    setXIsNext(true);
  }, []);

  const getSquareStyles = (square: Square) => {
    const baseStyles = "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white/90 backdrop-blur-sm flex items-center justify-center text-4xl md:text-5xl font-bold border-2 border-white/20 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all duration-200 active:scale-95";
    
    if (square === "X") return `${baseStyles} text-red-500 bg-red-50/80`;
    if (square === "O") return `${baseStyles} text-blue-500 bg-blue-50/80`;
    return `${baseStyles} text-gray-400 hover:bg-gray-50/80`;
  };

  const getStatusMessage = () => {
    if (winner === "Draw") return "It's a draw! 🤝";
    if (winner) return `🎉 ${winner} wins!`;
    return `${currentPlayer}'s turn`;
  };

  const getStatusStyles = () => {
    if (winner === "Draw") return "text-amber-600";
    if (winner) return "text-green-600";
    return "text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
            Tic Tac Toe
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8 p-4 bg-white/5 rounded-2xl backdrop-blur-sm">
          {board.map((square, index) => (
            <button
              key={index}
              aria-label={`Square ${index + 1}${square ? `, occupied by ${square}` : ', empty'}`}
              className={getSquareStyles(square)}
              onClick={() => handleSquareClick(index)}
              disabled={!isGameActive}
            >
              {square}
            </button>
          ))}
        </div>

        <div className="text-center mb-8">
          <div className={`text-2xl md:text-3xl font-bold ${getStatusStyles()} mb-4 min-h-[2.5rem] flex items-center justify-center`}>
            {getStatusMessage()}
          </div>
          
          {!isGameActive && (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full animate-bounce">
              <span className="text-2xl">
                {winner === "Draw" ? "🎯" : "👑"}
              </span>
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={resetGame}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300/50 transition-all duration-200 active:scale-95"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              New Game
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}