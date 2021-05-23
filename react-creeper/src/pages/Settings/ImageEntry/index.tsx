import { useState } from "react";

import { toast } from "react-toastify";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../../../firebase/fireinstance";

import { SignOut } from "../SignInOut";
import SetDisplay from "./SetDisplay";

import useLocalStorage from "../../../hooks/useLocalStorage";

import style from "./ImageEntry.module.css";
import NewSet from "./NewSet";

function ImageEntry() {
  const { storeImages, clearImages } = useLocalStorage("creeper-game-images");
  const [selectedSet, setSelected] = useState<any>("Create New Set");
  const [imageCount, setImageCount] = useState<number>(0);

  const [user] = useAuthState(auth);
  const imagesRef = firestore.collection("game-images");

  const query = imagesRef.where("user", "==", user?.uid);
  const [userSets] = useCollectionData(query);

  function handleSelect() {
    console.log(selectedSet?.images?.length);
    if (imageCount < 16) {
      toast.error("Can't play with less than 16 images!");
    } else {
      const set = userSets?.filter(
        (set: any) => set.setName === selectedSet.setName
      )[0];
      storeImages(set?.images);
      toast.success("Set Loaded!");
    }
  }

  async function handleDelete() {
    if (selectedSet !== "Create New Set") {
      imagesRef.doc(`${user?.uid}_${selectedSet.setName}`).delete();
      toast.warning(`Set "${selectedSet.setName}" deleted.`);
      setSelected("Create New Set");
    } else {
      toast.error("Can't delete 'Create New Set'");
    }
  }

  return (
    <div className={style.imageEntry}>
      <div className={style.selectControls}>
        <select
          value={selectedSet}
          onChange={(e) => {
            if (e.target.value === "Create New Set") {
              setSelected("Create New Set");
            } else {
              setSelected(
                userSets?.filter(
                  (set: any) => set.setName === e.target.value
                )[0]
              );
            }
            clearImages();
          }}
        >
          {userSets &&
            userSets.map((set: any) => (
              <option key={set.setName}>{set.setName}</option>
            ))}
          <option>Create New Set</option>
        </select>
        {selectedSet !== "Create New Set" && (
          <div className={imageCount >= 16 ? style.enough : style.notEnough}>
            {selectedSet !== "Create New Set" && `${imageCount} images`}
          </div>
        )}
        <button onClick={handleDelete}>Delete Set</button>
      </div>

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
            setImageCount={setImageCount}
            imagesRef={imagesRef}
          />
        )}
      </div>
      <div className={style.buttons}>
        {selectedSet !== "Create New Set" && (
          <button
            onClick={() => {
              handleSelect();
            }}
          >
            Use This Set
          </button>
        )}
      </div>
      <div className={style.signOutButton}>
        <SignOut />
      </div>
    </div>
  );
}

export default ImageEntry;
