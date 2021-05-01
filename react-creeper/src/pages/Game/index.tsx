import { useState, useEffect, useRef } from "react";

import useSound from "use-sound";

import GameOver from "./GameOver";
import TurnIndicator from "./TurnIndicator";
import StatsBlock from "./StatsBlock";
import GameCell from "./GameCell";
import House from "./House";

import { multiclass, shuffleArray } from "../../utility/functions";

import { safeSound, creeperSound, winSound } from "../../snd";
import images from "../../defaultImages";

import style from "./Game.module.css";
import common from "../../style/css/common.module.css";
import HouseBase from "./HouseBase";

type ScoreType = {
  A: number;
  B: number;
};

const Game = () => {
  const [cells, setCells] = useState<Array<object> | null>(null);
  const [totalRevealed, setTotalRevealed] = useState<number>(0);
  const [previousCell, setPreviousCell] = useState<string | null>(null);
  const [isFinished, setFinished] = useState(false);
  const [team, setTeam] = useState<string>(initialiseTeams()[0]);

  const [score, setScore] = useState<ScoreType>({ A: 0, B: 0 });

  const creepersFoundRef = useRef(0);

  const [playSafeSnd] = useSound(safeSound);
  const [playCreeperSnd] = useSound(creeperSound);
  const [playWinSnd] = useSound(winSound);

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

  function checkGameOver(score: ScoreType) {
    console.log("Creepers found: ", creepersFoundRef.current);
    console.log("Total revealed: ", totalRevealed);
    console.log("Current scores: ", score);
    if (creepersFoundRef.current >= 4) {
      console.log("Win condition: All creepers found");
      setFinished(true);
      playWinSnd();
    } else if (totalRevealed >= 16) {
      console.log("Win condition: All tiles revealed");
      setFinished(true);
      playWinSnd();
    } else if (score["A"] >= 4) {
      console.log("Win condition: Team A's score");
      setFinished(true);
      playWinSnd();
    } else if (score["B"] >= 4) {
      console.log("Win condition: Team B's score");
      setFinished(true);
      playWinSnd();
    }
  }

  function doTurn(isCreeper: boolean, currentTeam: string) {
    reportCreeper(isCreeper ? "creeper" : "safe");

    const newScore = { ...score };

    if (currentTeam === "A") {
      const aScore = isCreeper ? 0 : score["A"] + 1;
      newScore["A"] = aScore;
      if (aScore < 4) {
        setTeam("B");
      }
    } else {
      const bScore = isCreeper ? 0 : score["B"] + 1;
      newScore["B"] = bScore;
      if (bScore < 4) {
        setTeam("A");
      }
    }
    if (isCreeper) {
      playCreeperSnd();
    } else {
      playSafeSnd();
    }
    setTotalRevealed(totalRevealed + 1);
    setScore(newScore);
    checkGameOver(newScore);
  }

  useEffect(() => {
    const cells = initialiseCells(images);
    console.log("Playing with board: ", cells);
    setCells(cells);
  }, []);

  return (
    <div className={common.layout}>
      <div className={multiclass(common.teamHouse, common.teamA)}>
        <TurnIndicator isPlayerTurn={team === "A"} />
        <House score={score["A"]} />
        <HouseBase creepersFound={0} />
      </div>
      {isFinished ? (
        <div>
          <GameOver score={score} />
        </div>
      ) : (
        <div className={multiclass(common.board, style.board)}>
          {cells &&
            cells.map((c: any) => {
              return (
                <GameCell
                  key={c.image}
                  image={c.image}
                  isCreeper={c.isCreeper}
                  currentTeam={team}
                  doTurn={doTurn}
                />
              );
            })}
        </div>
      )}
      <div className={multiclass(common.teamHouse, common.teamB)}>
        <TurnIndicator isPlayerTurn={team === "B"} />
        <House score={score["B"]} />
        <HouseBase creepersFound={0} />
      </div>
    </div>
  );
};

export default Game;
