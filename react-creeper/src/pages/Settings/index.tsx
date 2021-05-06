import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import House from "../Game/House";
import HouseBase from "../Game/HouseBase";

import { multiclass, splitCleanly } from "../../utility/functions";

import style from "./Settings.module.css";
import common from "../../style/css/common.module.css";
import useLocalStorage from "../../hooks/useLocalStorage";

const Settings = () => {
  const [formText, setFormText] = useState<string>("");
  const [thumb, setThumb] = useState<string>("");

  const { storeImages } = useLocalStorage("creeper-images");


  function doStoreImages(images:string){

    const userImages = splitCleanly(formText)

    if (userImages.length >= 16) {
      storeImages(userImages)
      console.log("Stored list of images")
    } else {
      console.log("Not enough images")
    }

  }

  useEffect(() => {
    const th = splitCleanly(formText).pop();
    if (th) {
      setThumb(th);
    }
  }, [formText]);

  return (
    <div className={common.layout}>
      <div className={multiclass(common.teamHouse, common.teamA)}>
        <House score={4} />
        <HouseBase creepersFound={0} />
      </div>
      <div className={common.board}>
        <div className={style.welcome}>Customise the images</div>
        <Link to="/game" className={common.link}>
          Begin
        </Link>
        <Link to="/about" className={common.link}>
          Help
        </Link>
        <div className={style.form}>
          <div className={style.caption}>
            Add at least 16 .jpg or .png image urls.
          </div>
          <textarea
            value={formText}
            onChange={(e) => setFormText(e.target.value)}
            rows={6}
          />
          <div className={style.caption}>
            {formText ? splitCleanly(formText).length : "0"} image(s) detected.
          </div>
          <button onClick={()=> {doStoreImages(formText)}}>Submit</button>
        </div>
        <div className={style.example}>
          <div>Last image example:</div>
          {thumb && (
            <div className={style.card}>
              <div
                className={style.image}
                style={{ backgroundImage: `url("${thumb}")` }}
              ></div>
            </div>
          )}
        </div>
      </div>
      <div className={multiclass(common.teamHouse, common.teamB)}>
        <House score={4} />
        <HouseBase creepersFound={0} />
      </div>
    </div>
  );
};

export default Settings;
