import { useState, useRef } from "react";

import useSound from "use-sound";

import GameOver from "./GameOver";
import TurnIndicator from "./TurnIndicator";
import GameCell from "./GameCell";
import House from "./House";

import { multiclass, shuffleArray } from "../../utility/functions";

import { safeSound, creeperSound, winSound } from "../../snd";

import style from "./Game.module.css";
import common from "../../style/css/common.module.css";
import HouseBase from "./HouseBase";
import useInitialise from "../../hooks/useInitialise";

type ScoreType = {
  A: number;
  B: number;
};

const Game = () => {
  const initialCells = useInitialise();
  const [cells] = useState<Array<object> | null>(initialCells);
  const [totalRevealed, setTotalRevealed] = useState<number>(0);
  const [isFinished, setFinished] = useState(false);
  const [team, setTeam] = useState<string>(initialiseTeams()[0]);

  const [score, setScore] = useState<ScoreType>({ A: 0, B: 0 });
  const [teamCreepers, setTeamCreepers] = useState<ScoreType>({ A: 0, B: 0 });

  const creepersFoundRef = useRef(0);

  const [playSafeSnd] = useSound(safeSound);
  const [playCreeperSnd] = useSound(creeperSound);
  const [playWinSnd] = useSound(winSound);

  function initialiseTeams() {
    const teams = ["A", "B"];
    shuffleArray(teams);
    return teams;
  }

  function reportCreeper(cellType: string) {
    if (cellType === "creeper") {
    }
  }

  function checkGameOver(score: ScoreType) {
    if (creepersFoundRef.current >= 4) {
      setFinished(true);
      playWinSnd();
    } else if (totalRevealed >= 16) {
      setFinished(true);
      playWinSnd();
    } else if (score["A"] >= 4) {
      setFinished(true);
      playWinSnd();
    } else if (score["B"] >= 4) {
      setFinished(true);
      playWinSnd();
    }
  }

  function doTurn(isCreeper: boolean, currentTeam: string) {
    reportCreeper(isCreeper ? "creeper" : "safe");

    const newScore = { ...score };
    const creepers = { ...teamCreepers };

    if (currentTeam === "A") {
      const aScore = isCreeper ? 0 : score["A"] + 1;

      if (isCreeper) {
        creepers["A"] = creepers["A"] + 1;
      }

      newScore["A"] = aScore;
      if (aScore < 4) {
        setTeam("B");
      }
    } else {
      const bScore = isCreeper ? 0 : score["B"] + 1;

      if (isCreeper) {
        creepers["B"] = creepers["B"] + 1;
      }

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
    setTeamCreepers(creepers);
    checkGameOver(newScore);
  }

  return (
    <div className={common.layout}>
      <div className={multiclass(common.teamHouse, common.teamA)}>
        <TurnIndicator team="A" isPlayerTurn={team === "A"} />
        <House score={score["A"]} />
        <HouseBase creepersFound={teamCreepers["A"]} />
      </div>
      {isFinished ? (
        <div className={common.board}>
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
        <TurnIndicator team="B" isPlayerTurn={team === "B"} />
        <House score={score["B"]} />
        <HouseBase creepersFound={teamCreepers["B"]} />
      </div>
    </div>
  );
};

export default Game;
