import houseBase from "../../../style/images/houseBase";
import common from "../../../style/css/common.module.css"


function HouseBase({ creepersFound }: { creepersFound: number }) {

  return <img className={common.houseBase} src={creepersFound > 4? houseBase[3] : houseBase[creepersFound]}  alt=""/>;
}

export default HouseBase;
