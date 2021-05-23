import { useState } from "react";

import firebase from "firebase";

import style from "./NewSet.module.css";
import { toast } from "react-toastify";

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
          toast.success(`Set "${title}" created!`);
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
