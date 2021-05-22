import { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../../../firebase/fireinstance";

import { SignOut } from "../SignInOut";
import SetDisplay from "./SetDisplay";

import useGetSets from "../../../hooks/useGetSets";
import useLocalStorage from "../../../hooks/useLocalStorage";

import style from "./ImageEntry.module.css";
import NewSet from "./NewSet";

function ImageEntry() {
  const { storeImages, clearImages } = useLocalStorage("creeper-game-images");
  const [selectedSet, setSelected] = useState<any>("Create New Set");
  const [gameSetLoaded, setGameSetLoaded] = useState(false);

  const [user] = useAuthState(auth);
  const imagesRef = firestore.collection("game-images");

  const query = imagesRef.where("user", "==", user?.uid);
  const [userSets] = useCollectionData(query);

  return (
    <div className={style.imageEntry}>
      <select
        value={selectedSet}
        onChange={(e) => {
          if (e.target.value === "Create New Set") {
            setSelected("Create New Set");
          } else {
            setSelected(
              userSets?.filter((set: any) => set.setName === e.target.value)[0]
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
        {selectedSet === "Create New Set" ? (
          <NewSet
            uid={user?.uid}
            imagesRef={imagesRef}
            existingNames={userSets?.map((s: any) => s.setName)}
          />
        ) : (
          <SetDisplay
            title={selectedSet.setName}
            cards={selectedSet.images}
            imagesRef={imagesRef}
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
