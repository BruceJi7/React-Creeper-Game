import { houseState } from "../../../style/images/houseState";
import common from "../../../style/css/common.module.css"

function House({ score }: { score: number }) {
  return <img className={common.house} src={houseState[score]}  alt=""/>;
}

export default House;
