import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";

import { auth, firestore } from "../../../../firebase/fireinstance";

import { splitCleanly } from "../../../../utility/functions";

import style from "./CreateEditSet.module.css";

function CreateEditSet({ mode }: { mode: "add" | "edit" }) {
  const [name, setName] = useState("");
  const [formText, setFormText] = useState<string>("");
  const [user] = useAuthState(auth);

  function doStoreImages() {
    const userImages = splitCleanly(formText);
    if (user) {
      if (!name) {
        console.log("No name added");
        return;
      }
      if (userImages.length >= 16) {
        const userCollection = firestore.collection(user.uid);
        userCollection
          .add({
            user: user.uid,
            setName: name,
            images: userImages,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then((resp) => {
            console.log(resp);
            // setFormText("")
          });
        // Probably need a sort of notification for success or failure or w/e
      } else {
        console.log("Not enough images");
      }
    }
  }

  function doResetImages() {
    setFormText("");
  }

  return (
    <div className={style.createSet}>
      <input
        placeholder="Name your set of pictures"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

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
        <div className={style.buttons}>
          <button
            onClick={() => {
              doStoreImages();
            }}
          >
            Submit
          </button>
          <button
            onClick={() => {
              doResetImages();
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className={style.example}>
        <div className={style.title}>Images entered:</div>
        <div className={style.exampleCells}>
          {formText &&
            splitCleanly(formText).map((img) => {
              return (
                <div className={style.card}>
                  <div
                    className={style.image}
                    style={{ backgroundImage: `url("${img}")` }}
                  ></div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default CreateEditSet;
