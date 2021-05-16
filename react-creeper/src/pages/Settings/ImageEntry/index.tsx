import { useState } from "react";
import { SignOut } from "../SignInOut";
import CreateEditSet from "./CreateEditSet";

import style from "./ImageEntry.module.css";

type modeType = "choose" | "add";
// where choose = choosing image sets,
// add = adding new image sets,
// edit = editing existing image sets

function ImageEntry() {
  const [mode, setMode] = useState<modeType>("add");

  let internal;

  switch (mode) {
    case "add":
      internal = <CreateEditSet mode="add" />;
      break;
    default:
      internal = <CreateEditSet mode="add" />;
  }

  return (
    <div className={style.imageEntry}>
      <SignOut />
      <div className={style.buttons}>
        <button>Create New Set</button>
        <button>Edit Existing Set</button>
        <button>Select A Set</button>
      </div>
      {internal}
      {/* See existing sets here, and choose one */}
      {/* Be able to edit an existing set */}
      {/* Be able to create a set */}
    </div>
  );
}

export default ImageEntry;
