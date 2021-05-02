import { Link } from "react-router-dom";

import House from "../Game/House";
import HouseBase from "../Game/HouseBase";

import { multiclass } from "../../utility/functions";

import style from "./Settings.module.css";
import common from "../../style/css/common.module.css";
import { useState } from "react";


// const setImages () => {

// }



const Settings = () => {

  const [formText, setFormText]  = useState<string>("")
  const [imageURLS, setImageURLS] = useState<string>("")

  return (
    <div className={common.layout}>
      <div className={multiclass(common.teamHouse, common.teamA)}>
        <House score={4}/>
        <HouseBase creepersFound={0}/>
      </div>
      <div className={common.board}>
           <div className={style.welcome}>Customise the images</div>
            <Link to="/game" className={common.link}>Begin</Link>
            <Link to="/about" className={common.link}>About</Link>
            <div className={style.form}>
              <textarea value={formText} onChange={(e)=> setFormText(e.target.value)} rows={16}/>
            </div>
      </div>
      <div className={multiclass(common.teamHouse, common.teamB)}>
        <House score={4}/>
        <HouseBase creepersFound={0}/>
        </div>
    </div>
  );
};

export default Settings;
