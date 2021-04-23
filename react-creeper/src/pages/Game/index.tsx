import { useState, useEffect, useRef } from "react";

import GameCell from "./GameCell";

import { shuffleArray } from "../../utility/functions";

import style from "./Game.module.css";

import images from "../../defaultImages";

const Game = () => {
  const [cells, setCells] = useState<Array<object> | null>(null);
  const [totalRevealed, setTotalRevealed] = useState<number>(0);
  const [previousCell, setPreviousCell] = useState<string | null>(null);

  const countRef = useRef(0)

  function initialiseCells(imgArray: Array<string>) {
    const sessionImg = imgArray.slice(0, 16);
    shuffleArray(sessionImg);
    let cells = sessionImg.map((l) => {
      return { image: l, isCreeper: false };
    });
    const creepers = cells.slice(0, 4).map((c) => {
      return { ...c, isCreeper: true };
    });
    const safe = cells.slice(4);
    cells = creepers.concat(safe);
    shuffleArray(cells);
    return cells;
  }

  function reportCreeper(cellType:string) {
    if (cellType === "creeper"){
        setPreviousCell("creeper")
        countRef.current++
    }  
  }

  useEffect(() => {
    const cells = initialiseCells(images);
    setCells(cells);
  }, []);


  return (
    <div className={style.container}>
      <div className={style.board}>
        {cells &&
          cells.map((c: any) => (
            <GameCell
              key={c.image}
              increment={() => setTotalRevealed(totalRevealed + 1)}
              reportCell={reportCreeper}
              image={c.image}
              isCreeper={c.isCreeper}
            />
          ))}
      </div>
      <div className={style.statsBoard}>
        <div className={style.total}>{totalRevealed}</div>
        <div className={style.total}>{countRef.current}</div>
        <div className={style.previous}>{previousCell}</div>
      </div>
    </div>
  );
};

export default Game;
