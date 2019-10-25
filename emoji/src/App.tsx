/* eslint-env browser */
import React, { FC, createRef, useState } from "react";
import Picker from "./components/Picker";
import styles from "./App.module.css";

const App: FC = () => {
  const inputRef = createRef<HTMLInputElement>();
  const [isPickerOpen, setPickerOpen] = useState<boolean>(true);

  return (
    <div className={styles.app}>
      <input ref={inputRef} />
      <button
        type="button"
        onClick={() => {
          setPickerOpen(!isPickerOpen);
        }}
      >
        Toggle picker
      </button>
      <Picker inputRef={inputRef} hidden={!isPickerOpen} />
    </div>
  );
};

export default App;
