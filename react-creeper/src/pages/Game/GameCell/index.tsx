import { useState } from "react";

import creeperImg from "../../../style/images/creeperHead.png";
import cobbleImg from "../../../style/images/cobbleStone.png";
import style from "./GameCell.module.css";

type Props = {
  image: string;
  isCreeper: boolean;
  increment: () => void;
  reportCell: (cellType: string) => void;
};

function GameCell({ image, isCreeper, increment, reportCell }: Props) {
  const [isRevealed, setRevealed] = useState<boolean>(false);

  function handleClick(isCreeper: boolean, isRevealed: boolean) {
    if (!isRevealed) {
      setRevealed(true);
      reportCell(isCreeper ? "creeper" : "safe");
      increment();
    }
  }

  if (isRevealed) {
    if (isCreeper) {
      return (
        <div className={style.card} onClick={() => handleClick(isCreeper, isRevealed)}>
          <img src={creeperImg} alt="Bomb" />
        </div>
      );
    } else {
      return (
        <div className={style.card} onClick={() => handleClick(isCreeper, isRevealed)}>
          <img src={cobbleImg} alt="Safe" />
        </div>
      );
    }
  } else {
    return (
      <div className={style.card} onClick={() => handleClick(isCreeper, isRevealed)}>
        <img src={image} alt="Unknown" />
      </div>
    );
  }
}

export default GameCell;
