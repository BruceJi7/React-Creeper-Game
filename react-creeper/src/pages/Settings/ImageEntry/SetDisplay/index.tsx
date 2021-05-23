import { useEffect, useState } from "react";

import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { auth, firestore } from "../../../../firebase/fireinstance";

import style from "./SetDisplay.module.css";

type Props = {
  isNew?: boolean;
  title: string;
  cards: string[];
  setImageCount: (_: number) => void;
  imagesRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
};

type imageSet = {
  setName: string;
  createdAt: firebase.firestore.FieldValue;
  images: string[];
  user: string;
};

function ImageCell({
  imgSrc,
  deleteImage,
}: {
  imgSrc: string;
  deleteImage: (imgURL: string) => void;
}) {
  return (
    <div className={style.image} style={{ backgroundImage: `url(${imgSrc})` }}>
      <div className={style.delete} onClick={() => deleteImage(imgSrc)}>
        x
      </div>
      &nbsp;
    </div>
  );
}

function SetDisplay({ setImageCount, title }: Props) {
  const [cardInput, setCardInput] = useState("");
  const [displayImages, setDisplayImages] = useState<any>(null);

  const [user] = useAuthState(auth);
  const imagesRef = firestore.collection("game-images");

  const query = imagesRef
    .where("user", "==", user?.uid)
    .where("setName", "==", title);
  const [userDoc] = useCollectionData(query);

  // UseEffect to load images ready to display
  useEffect(() => {
    if (userDoc !== undefined) {
      const userSet = userDoc as unknown as imageSet[];
      setDisplayImages(userSet[0].images);
    }
  }, [userDoc]);

  // UseEffect to get the image count to update
  useEffect(() => {
    if (displayImages?.length) {
      setImageCount(displayImages?.length);
      const box = document.getElementById("card-box");
      if (box) {
        box.scrollLeft = 9000;
      }
    }
  }, [displayImages?.length, setImageCount]);

  // useEffect to instantly add image to the set if valid
  useEffect(() => {
    if (cardInput) {
      if (
        cardInput.endsWith(".png") ||
        cardInput.endsWith(".jpg") ||
        cardInput.endsWith(".gif") ||
        cardInput.endsWith(".jpeg")
      ) {
        imagesRef.doc(`${user?.uid}_${title}`).update({
          images: [...displayImages, cardInput],
        });
        setCardInput("");
      }
    }
  }, [cardInput, displayImages, imagesRef, title, user?.uid]);

  function deleteImage(imgURL: string) {
    const filteredImages = displayImages.filter((i: string) => i !== imgURL);

    imagesRef.doc(`${user?.uid}_${title}`).update({
      images: filteredImages,
    });
  }

  return (
    <div className={style.SetDisplay}>
      <div className={style.cardBox} id="card-box">
        {displayImages?.length > 0 ? (
          displayImages?.map((c: any) => {
            return (
              <div className={style.card} key={c}>
                <ImageCell imgSrc={c} deleteImage={deleteImage} />
              </div>
            );
          })
        ) : (
          <div className={style.card}>
            <div className={style.nullCard}>No cards loaded!</div>
          </div>
        )}
      </div>
      <input
        className={style.newCardEntry}
        placeholder="Add image URL"
        value={cardInput}
        onChange={(e) => setCardInput(e.target.value)}
      />
    </div>
  );
}

export default SetDisplay;
