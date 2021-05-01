import { useState } from "react";

import creeperImg from "../../../style/images/creeperHead.png";
import cobbleImg from "../../../style/images/cobbleStone.png";

import style from "./GameCell.module.css";

type Props = {
  image: string;
  isCreeper: boolean;
  currentTeam: string;
  doTurn: (isCreeper: boolean, currentTeam: string) => void;
};

function GameCell({ image, isCreeper, currentTeam, doTurn }: Props) {
  const [isRevealed, setRevealed] = useState<boolean>(false);

  function handleClick(isCreeper: boolean, isRevealed: boolean) {
    if (!isRevealed) {
      setRevealed(true);
      doTurn(isCreeper, currentTeam);
    }
  }

  let imgSrc;
  if (isRevealed) {
    if (isCreeper) {
      imgSrc = creeperImg;
    } else {
      imgSrc = cobbleImg;
    }
  } else {
    imgSrc = image;
  }

  return (
    <div
      className={style.card}
      onClick={() => handleClick(isCreeper, isRevealed)}
    >
      <div
        className={style.image}
        style={{ backgroundImage: `url(${imgSrc})` }}
      >
        &nbsp;
      </div>
    </div>
  );
}

export default GameCell;
