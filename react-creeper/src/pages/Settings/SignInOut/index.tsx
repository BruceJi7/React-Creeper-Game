import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { toast } from "react-toastify";

import { auth } from "../../../firebase/fireinstance";

import style from "./SignInOut.module.css";

export const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider);
  };

  return (
    <div className={style.signInOut}>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      Sign In to add, edit, and use your own sets of images!
    </div>
  );
};

export const SignOut = () => {
  const history = useHistory();
  const handleSignOut = () => {
    auth.signOut();
    history.push("/");
    toast("Signed out successfully");
  };

  return (
    auth.currentUser && (
      <div className={style.signInOut}>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    )
  );
};
