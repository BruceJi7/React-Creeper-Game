// import { useState } from "react";
import { Link } from "react-router-dom";

import House from "../Game/House";

import style from "./Welcome.module.css";
import common from "../../style/css/common.module.css";
import HouseBase from "../Game/HouseBase";
import { multiclass } from "../../utility/functions";

const Welcome = () => {
  return (
    <div className={common.layout}>
      <div className={multiclass(common.teamHouse, common.teamA)}>
        <House score={4}/>
        <HouseBase creepersFound={0}/>
      </div>
      <div className={common.board}>
           <div className={style.welcome}>Welcome to Creeper Game!</div>
            <Link to="/game" className={style.link}>Begin</Link>
      </div>
      <div className={multiclass(common.teamHouse, common.teamB)}>
        <House score={4}/>
        <HouseBase creepersFound={0}/>
        </div>
    </div>
  );
};

export default Welcome;
