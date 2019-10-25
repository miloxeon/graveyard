import React, { FC, ChangeEvent } from "react";
import debounce from "lodash.debounce";
import { ReactComponent as Glass } from "./assets/glass.svg";
import { ReactComponent as Cross } from "./assets/cross.svg";
import styles from "./styles.module.css";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Callback to be called after user enters search query */
  debouncedAction: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Callback that will be bound to X icon */
  reset: () => void;
}

const Search: FC<Props> = ({ value, onChange, debouncedAction, reset }) => {
  const action = debounce(debouncedAction, 0, {
    leading: true,
    trailing: true
  });
  return (
    <div className={styles.root}>
      <Glass className={styles.searchIcon} />
      <input
        type="search"
        placeholder="Search"
        className={styles.search}
        value={value}
        onChange={e => {
          onChange(e);
          action(e);
        }}
      />
      {value.length > 0 && (
        <button className={styles.resetButton} type="button" onClick={reset}>
          <Cross className={styles.resetIcon} />
        </button>
      )}
    </div>
  );
};

export default Search;
