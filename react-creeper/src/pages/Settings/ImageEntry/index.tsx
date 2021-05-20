import { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/fireinstance";

import { SignOut } from "../SignInOut";
import SetDisplay from "./SetDisplay";

import useGetSets from "../../../hooks/useGetSets";
import useLocalStorage from "../../../hooks/useLocalStorage";

import style from "./ImageEntry.module.css";

function ImageEntry() {
  const [user] = useAuthState(auth);
  const userID = user?.uid;

  const { getAllSets } = useGetSets(userID);
  const { storeImages, clearImages } = useLocalStorage("creeper-game-images");

  const [userSets, setUserSets] = useState<any>(null);
  const [selectedSet, setSelected] = useState<any>("Create New Set");
  const [gameSetLoaded, setGameSetLoaded] = useState(false);

  useEffect(() => {
    if (userID) {
      getAllSets().then((res: any) => {
        console.log(res);
        setUserSets(res);
      });
    }
  }, [userID]); //eslint-disable-line
  // Clearned this warning with disable. Warning requires adding getAllSets
  // to useEffect dependency but that causes an infinite loop.
  // A better solution is..? useCallback?

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
          setGameSetLoaded(false);
          clearImages();
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
      <div className={style.buttons}>
        {selectedSet !== "Create New Set" && (
          <button
            onClick={() => {
              if (!gameSetLoaded) {
                storeImages(selectedSet.images);
                setGameSetLoaded(true);
              }
            }}
          >
            {gameSetLoaded ? "Set Loaded" : "Use This Set"}
          </button>
        )}
      </div>
      <SignOut />
    </div>
  );
}

export default ImageEntry;
