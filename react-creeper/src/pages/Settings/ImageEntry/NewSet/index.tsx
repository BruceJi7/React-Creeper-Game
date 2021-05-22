import { useEffect, useState } from "react";

import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { auth, firestore } from "../../../../firebase/fireinstance";

import style from "./NewSet.module.css";

type Props = {
  uid: string | undefined;
  imagesRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  existingNames: any[] | undefined;
};

function NewSet({ existingNames, uid, imagesRef }: Props) {
  const [title, setTitle] = useState("");
  const [prevent, setPrevent] = useState(false);

  function handleCreate() {
    if (title) {
      if (existingNames?.includes(title)) {
        setPrevent(true);
      } else {
        if (uid) {
          imagesRef.doc(`${uid}_${title}`).set({
            setName: title,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            images: [],
            user: uid,
          });
        }
      }
      setTitle("");
    }
  }

  function handleEdit(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    if (prevent) {
      setPrevent(false);
    }
  }

  return (
    <div className={style.newSet}>
      <input
        className={prevent ? style.no : undefined}
        placeholder={prevent ? "Set name already exists" : "Set name"}
        value={title}
        onChange={(e) => handleEdit(e)}
      />
      <button onClick={() => handleCreate()}>Create!</button>
    </div>
  );
}
export default NewSet;
