import { useState, useEffect } from "react";
import { firestore } from "../firebase/fireinstance";

function useGetSets(uid: string | undefined) {
  const [sets, setSets] = useState<any>(null);

  const getAllSets = async () => {
    if (uid) {
      const snapshot = await firestore.collection(uid).get();
      return snapshot.docs.map((doc) => doc.data());
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (uid) {
      getAllSets().then((sets) => setSets(sets));
    }
  });

  return { sets, getAllSets };
}

export default useGetSets;
