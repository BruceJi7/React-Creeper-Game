import firebase from "firebase/app";

import { auth } from "../../../firebase/fireinstance";

import style from "./SignInOut.module.css";

export const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider);
  };

  // const signInWithOther = () => {
  //   const provider = new firebase.auth.EmailAuthProvider();

  //   auth.signInWithPopup(provider);
  // };

  return (
    <div className={style.signInOut}>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      {/* <button onClick={signInWithOther}>Sign In with Email</button> */}
      Sign In to add, edit, and use your own sets of images!
    </div>
  );
};

export const SignOut = () => {
  return (
    auth.currentUser && (
      <div className={style.signInOut}>
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </div>
    )
  );
};
