import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { auth } from "../../firebase/fireinstance";
import { useAuthState } from "react-firebase-hooks/auth";

import House from "../Game/House";
import HouseBase from "../Game/HouseBase";
import { SignIn, SignOut } from "./SignInOut";

import useLocalStorage from "../../hooks/useLocalStorage";

import { multiclass, splitCleanly } from "../../utility/functions";

import style from "./Settings.module.css";
import common from "../../style/css/common.module.css";

const Settings = () => {
  const [user] = useAuthState(auth);

  const [formText, setFormText] = useState<string>("");
  const [thumb, setThumb] = useState<string>("");

  const { storeImages, retrieveImages, clearImages } =
    useLocalStorage("creeper-images");

  function doStoreImages() {
    const userImages = splitCleanly(formText);

    if (userImages.length >= 16) {
      storeImages(userImages);
      console.log("Stored list of images", userImages);
    } else {
      console.log("Not enough images");
    }
  }

  function doResetImages() {
    setFormText("");
    clearImages();
  }

  useEffect(() => {
    const th = splitCleanly(formText).pop();
    if (th) {
      setThumb(th);
    }
  }, [formText]);

  useEffect(() => {
    const previousImages = retrieveImages();
    if (previousImages) {
      setFormText(previousImages.join("\n"));
    }
  }, [retrieveImages]);

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

        <div className={style.userSection}>
          {user ? <SignOut /> : <SignIn />}
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
