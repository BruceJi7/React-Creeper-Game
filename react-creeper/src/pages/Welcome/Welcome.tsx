import { Link } from "react-router-dom";

import House from "../Game/House";
import HouseBase from "../Game/HouseBase";

import { multiclass } from "../../utility/functions";

import style from "./Welcome.module.css";
import common from "../../style/css/common.module.css";

const Welcome = () => {
  return (
    <div className={common.layout}>
      <div className={multiclass(common.teamHouse, common.teamA)}>
        <House score={4}/>
        <HouseBase creepersFound={0}/>
      </div>
      <div className={common.board}>
           <div className={style.welcome}>Welcome to Creeper Game!</div>
            <Link to="/game" className={common.link}>Begin</Link>
            <Link to="/about" className={common.link}>About</Link>
      </div>
      <div className={multiclass(common.teamHouse, common.teamB)}>
        <House score={4}/>
        <HouseBase creepersFound={0}/>
        </div>
    </div>
  );
};

export default Welcome;
