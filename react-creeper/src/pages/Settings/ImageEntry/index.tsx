import { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import { auth, firestore } from "../../../firebase/fireinstance";

import { SignOut } from "../SignInOut";
import SetDisplay from "./SetDisplay";

import useGetSets from "../../../hooks/useGetSets";

import { splitCleanly } from "../../../utility/functions";

import style from "./ImageEntry.module.css";

function ImageEntry() {
  const [user] = useAuthState(auth);
  const userID = user?.uid;
  const { getAllSets } = useGetSets(userID);

  const [userSets, setUserSets] = useState<any>(null);

  useEffect(() => {
    if (userID) {
      getAllSets().then((res: any) => {
        console.log(res);
        setUserSets(res);
      });
    }
  }, [userID]);

  return (
    <div className={style.imageEntry}>
      <div className={style.setsBox}>
        {userSets &&
          userSets.map((set: any) => {
            return (
              <SetDisplay
                key={set.setName}
                title={set.setName}
                cards={set.images}
              />
            );
          })}
      </div>
      <SignOut />
    </div>
  );
}

export default ImageEntry;
