// import { useState } from "react";
import { Link } from "react-router-dom";

import style from "./Welcome.module.css";
import common from "../../style/css/common.module.css";

const Welcome = () => {
  return (
    <div className={common.layout}>
      <div className={common.teamAHouse}>&nbsp;</div>
      <div className={common.board}>
           <div className={style.welcome}>Welcome to Creeper Game!</div>
            <Link to="/game" className={style.link}>Begin</Link>
      </div>
      <div className={common.teamBHouse}></div>
    </div>
  );
};

export default Welcome;
