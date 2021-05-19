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
  const [selectedSet, setSelected] = useState<any>("Create New Set");

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
      <select
        value={selectedSet}
        onChange={(e) => {
          if (e.target.value === "Create New Set") {
            setSelected("Create New Set");
          } else {
            setSelected(
              userSets.filter((set: any) => set.setName === e.target.value)[0]
            );
          }
        }}
      >
        {userSets &&
          userSets.map((set: any) => (
            <option key={set.setName}>{set.setName}</option>
          ))}
        <option>Create New Set</option>
      </select>

      <div className={style.setsBox}>
        {selectedSet !== "Create New Set" && (
          <SetDisplay
            key={selectedSet.setName}
            title={selectedSet.setName}
            cards={selectedSet.images}
          />
        )}
      </div>
      <SignOut />
    </div>
  );
}

export default ImageEntry;
