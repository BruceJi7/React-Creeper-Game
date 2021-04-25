import { Link } from "react-router-dom";

import A from "../../../style/images/winner/winTileA.png"

import B from "../../../style/images/winner/winTileB.png"

import All from "../../../style/images/winner/winTileAll.png"

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

console.log(image)
  return <div className={style.gameOver} style={{background: `url(${image})`}}>
    <Link to="/" className={style.link}>
        Play Again?
    </Link>
      
  </div>;
}

export default GameOver;
