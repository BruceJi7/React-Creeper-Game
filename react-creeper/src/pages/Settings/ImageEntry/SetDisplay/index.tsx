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

function SetDisplay({ isNew, title }: Props) {
  const [cardInput, setCardInput] = useState("");
  const [ID, setID] = useState(null);

  const [displayImages, setDisplayImages] = useState<any>(null);

  const [user] = useAuthState(auth);
  const imagesRef = firestore.collection("game-images");

  const query = imagesRef
    .where("user", "==", user?.uid)
    .where("setName", "==", title);
  const [userDoc] = useCollectionData(query);

  useEffect(() => {
    if (userDoc !== undefined) {
      const userSet = userDoc as unknown as imageSet[];
      setDisplayImages(userSet[0]);
    }
  }, [userDoc]);

  function deleteImage(imgURL: string) {
    const filteredImages = displayImages.images.filter(
      (i: string) => i !== imgURL
    );

    imagesRef.doc(`${user?.uid}_${title}`).update({
      images: filteredImages,
    });
  }

  useEffect(() => {
    if (cardInput) {
      if (
        cardInput.endsWith(".png") ||
        cardInput.endsWith(".jpg") ||
        cardInput.endsWith(".gif") ||
        cardInput.endsWith(".jpeg")
      ) {
        imagesRef.doc(`${user?.uid}_${title}`).update({
          images: [...displayImages.images, cardInput],
        });
        setCardInput("");
      }
    }
  }, [cardInput]);

  return (
    <div className={style.SetDisplay}>
      <div className={style.title}>{title}</div>
      <div className={style.cardBox}>
        {displayImages?.images?.map((c: any) => {
          return (
            <div className={style.card} key={c}>
              <ImageCell imgSrc={c} deleteImage={deleteImage} />
            </div>
          );
        })}
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
