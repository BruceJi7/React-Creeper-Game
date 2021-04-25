import { useState, useEffect, useRef } from "react";

import GameCell from "./GameCell";
import House from "./House";

import { shuffleArray } from "../../utility/functions";

import style from "./Game.module.css";

import images from "../../defaultImages";
import GameOver from "./GameOver";


type ScoreType = {
  A:number,
  B:number
}

const Game = () => {
  const [cells, setCells] = useState<Array<object> | null>(null);
  const [totalRevealed, setTotalRevealed] = useState<number>(0);
  const [previousCell, setPreviousCell] = useState<string | null>(null);
  const [isFinished, setFinished] = useState(false);
  const [team, setTeam] = useState<string>(initialiseTeams()[0]);

  const [score, setScore] = useState<ScoreType>({A:0, B:0})


  const creepersFoundRef = useRef(0);

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

  function initialiseTeams() {
    const teams = ["A", "B"];
    shuffleArray(teams);
    return teams;
  }

  function reportCreeper(cellType: string) {
    setPreviousCell(cellType);
    if (cellType === "creeper") {
      creepersFoundRef.current++;
    }
  }

  function checkGameOver(score:ScoreType) {
    console.log("Creepers found: ", creepersFoundRef.current);
    console.log("Total revealed: ", totalRevealed)
    console.log("Current scores: ", score)
    if (creepersFoundRef.current >= 4) {
      console.log("Win condition: All creepers found")
      setFinished(true);
    } else if (totalRevealed >= 16) {
      console.log("Win condition: All tiles revealed")
      setFinished(true);
    } else if (score["A"] >= 4) {
      console.log("Win condition: Team A's score")
      setFinished(true);
    } else if (score["B"] >= 4) {
      console.log("Win condition: Team B's score")
      setFinished(true);
    }

    
  }

  function doTurn(isCreeper:boolean, currentTeam:string){
    reportCreeper(isCreeper ? "creeper" : "safe")

    const newScore = {...score}


    if (currentTeam === "A"){

      const aScore = isCreeper? 0 : score["A"]+1
      newScore["A"] = aScore
      if (aScore < 4){
          setTeam("B")
      }

    } else {

      const bScore = isCreeper? 0 : score["B"]+1
      newScore["B"] = bScore
      if (bScore < 4){
        setTeam("A")
      }
    }
    setTotalRevealed(totalRevealed + 1)
    setScore(newScore)
    checkGameOver(newScore)
  }


  useEffect(() => {
    const cells = initialiseCells(images);
    console.log("Playing with board: ", cells)
    setCells(cells);
  }, []);

  return (
    <div className={style.layout}>
      <div className={style.header}></div>
      <div className={style.house}>

        <div className={style.turnIndicator}>{team === "A" && "Your turn"}</div>
        <span>{score["A"]}</span>
        <House score={score["A"]} />
      </div>
      <div className={style.board}>
        <div className={style.board}>
          {isFinished? 
          <GameOver score={score}/>
          :  
          cells &&
            cells.map((c: any) => (
              <GameCell
              key={c.image}
              image={c.image}
              isCreeper={c.isCreeper}
              currentTeam={team}
              doTurn={doTurn}
              />
              ))
            }
        </div>
      </div>
      <div className={style.house}>
        <div className={style.turnIndicator}>{team === "B" && "Your turn"}</div>
        <span>{score["B"]}</span>
        <House score={score["B"]} />
      </div>
      <div className={style.teamABase}></div>
      <div className={style.stats}>
        <div className={style.total}>{totalRevealed}</div>
        <div className={style.total}>{creepersFoundRef.current}</div>
        <div className={style.previous}>{previousCell}</div>
        {isFinished && <div className={style.finished}>GAME OVER</div>}
      </div>
      <div className={style.teamBBase}></div>
    </div>
  );
};

export default Game;
