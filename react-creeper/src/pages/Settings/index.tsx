import { Link } from "react-router-dom";
import { auth } from "../../firebase/fireinstance";
import { useAuthState } from "react-firebase-hooks/auth";

import House from "../Game/House";
import HouseBase from "../Game/HouseBase";
import ImageEntry from "./ImageEntry";
import { SignIn } from "./SignInOut";

import { multiclass } from "../../utility/functions";

import style from "./Settings.module.css";
import common from "../../style/css/common.module.css";

const Settings = () => {
  const [user] = useAuthState(auth);

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
          {user ? <ImageEntry /> : <SignIn />}
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
