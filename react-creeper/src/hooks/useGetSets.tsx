import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "../firebase/fireinstance";
import firebase from "firebase";

const game_images = "game-images";

function useGetSets() {
  const [user] = useAuthState(auth);

  const editSet = async (setTitle: string, cards: string[]) => {
    if (user) {
      const ref = await firestore.collection(game_images);
      const setDoc = await (
        await ref.where("setName", "==", setTitle).get()
      ).docs[0].ref;
      setDoc.update({ images: cards });
      console.log("Hook used to update");
    }
    return null;
  };

  const createSet = async (setName: string) => {
    const ref = await firestore.collection(game_images);
    if (user) {
      await ref.add({
        setName: setName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        images: [],
        user: user.uid,
      });
    }
  };

  return { editSet, createSet };
}

export default useGetSets;
