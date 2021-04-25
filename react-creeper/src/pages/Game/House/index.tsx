import { houseState } from "../../../style/images/houseState";

function House({ score }: { score: number }) {
  return <img src={houseState[score]}  alt=""/>;
}

export default House;
