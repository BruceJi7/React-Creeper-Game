import houseBase from "../../../style/images/houseBase";
import common from "../../../style/css/common.module.css"


function HouseBase({ creepersFound }: { creepersFound: number }) {
  return <img className={common.houseBase} src={houseBase[creepersFound]}  alt=""/>;
}

export default HouseBase;
