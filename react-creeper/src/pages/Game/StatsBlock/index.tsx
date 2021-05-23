import style from "./StatsBlock.module.css";

import blocksIcon from "../../../style/images/blocksRemainingIcon.png";
import creepersIcon from "../../../style/images/creepersRemainingIcon.png";
import woodFrame from "../../../style/images/frame.png";

type StatsProps = {
  totalRevealed: number;
  creepersFound: number;
  previousCell: string | null;
};

function StatsBlock({
  totalRevealed,
  creepersFound,
  previousCell,
}: StatsProps) {
  let prev;
  if (previousCell === "creeper") {
    prev = <img src={creepersIcon} alt="Last cell was a creeper" />;
  } else if (previousCell === "safe") {
    prev = <img src={blocksIcon} alt="Last cell was a block" />;
  }

  return (
    <div className={style.statsBlock}>
      <img src={blocksIcon} alt="blocks remaining" />
      <div className={style.total}>{totalRevealed}</div>
      <div
        className={style.previous}
        style={{ background: `url(${woodFrame})` }}
      >
        {prev && (
          <>
            previous:
            {prev}
          </>
        )}
      </div>
      <div className={style.total}>{creepersFound}</div>
      <img src={creepersIcon} alt="creepers remaining" />
    </div>
  );
}

export default StatsBlock;
