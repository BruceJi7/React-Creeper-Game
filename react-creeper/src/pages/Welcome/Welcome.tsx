import { useState } from "react";
import { Link } from "react-router-dom";

import style from "./Welcome.module.css";

const Welcome = () => {
  const [teamAName, setTeamAName] = useState<string>("");
  const [teamBName, setTeamBName] = useState<string>("");

  return (
    <div className={style.layout}>

     
      
      
      <div className={style.header}></div>
      <div className={style.teamAHouse}></div>
      <div className={style.board}>
           <div className={style.welcome}>Welcome to Creeper Game!</div>
            <Link to="/game">Begin</Link>
      </div>
      <div className={style.teamBHouse}></div>
      <div className={style.teamABase}></div>
      <div className={style.stats}></div>
      <div className={style.teamBBase}></div>
    </div>
  );
};

export default Welcome;
