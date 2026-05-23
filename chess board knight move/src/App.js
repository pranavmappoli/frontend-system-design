import React, { useEffect, useRef, useState } from "react";

function App() {
  const knightMoves = [
    [-2, 1],
    [-2, -1],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [1, 2],
    [-1, 2],
  ];
  const [howerRowCol, setHowerRowCol] = useState([-1, -1]);
  const [possibleMoves, setPossibleMoves] = useState(new Set());
  const rows = 8;
  const cols = 8;

  const isKnightCanMove = () => {
    const [hoverRow, hoverCol] = howerRowCol;

    if (hoverCol < 0 || hoverRow < 0) {
      setPossibleMoves(new Set());
      return;
    }

    const moves = new Set();

    for (let [x, y] of knightMoves) {
      moves.add(`${hoverRow + x}-${hoverCol + y}`);
    }
    setPossibleMoves(moves);
  };

  useEffect(() => {
    isKnightCanMove();
  }, [howerRowCol]);

  console.log(possibleMoves, "helloo");

  return (
    <div className="flex flex-col  w-screen  bg-blue-300">
      {Array(rows)
        .fill(0)
        .map((row, rowIndx) => (
          <div className="flex justify-center">
            {Array(cols)
              .fill(0)
              .map((row, colIndx) => (
                <div
                  className={` w-16 h-16 cursor-pointer ${possibleMoves.has(`${rowIndx + "-" + colIndx}`) ? "bg-green-500" : (colIndx + rowIndx) % 2 === 0 ? "bg-white" : "bg-black"}`}
                  onMouseEnter={() => setHowerRowCol([rowIndx, colIndx])}
                  onMouseLeave={() => setHowerRowCol([-1, -1])}
                >{`${rowIndx} ${colIndx}`}</div>
              ))}
          </div>
        ))}
    </div>
  );
}

export default App;
