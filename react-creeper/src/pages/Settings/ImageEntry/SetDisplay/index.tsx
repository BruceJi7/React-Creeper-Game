import style from "./SetDisplay.module.css";

type Props = {
  title: string;
  cards: string[];
};

function ImageCell({ imgSrc }: { imgSrc: string }) {
  return (
    <div className={style.image} style={{ backgroundImage: `url(${imgSrc})` }}>
      &nbsp;
    </div>
  );
}

function SetDisplay({ title, cards }: Props) {
  return (
    <div className={style.SetDisplay}>
      <div className={style.title}>{title}</div>
      <div className={style.cardBox}>
        {cards &&
          cards.map((c) => {
            return (
              <div className={style.card} key={c}>
                <ImageCell imgSrc={c} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SetDisplay;
