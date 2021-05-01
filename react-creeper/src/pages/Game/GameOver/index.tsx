import { Link } from "react-router-dom";

import A from "../../../style/images/winner/winA.png"

import B from "../../../style/images/winner/winB.png"

import All from "../../../style/images/winner/winAll.png"

import style from "./GameOver.module.css";

type ScoreType = {
  score: {
    A: number;
    B: number;
  };
};

function GameOver({ score }: ScoreType) {
  console.log("Game Over: ", score);

  let image;

  if (score["A"] > score["B"]) {
    image = A
  } else if (score["B"] > score["A"]) {
    image = B
  } else {
    image = All
  }
  return <div className={style.gameOver} style={{backgroundImage: `url(${image})`}}>
    <Link to="/" className={style.link}>
        Play Again?
    </Link>
      
  </div>;
}

export default GameOver;
