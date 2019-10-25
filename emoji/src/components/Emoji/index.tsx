import React, { FC, MouseEvent, KeyboardEvent, SyntheticEvent } from "react";
import styles from "./styles.module.css";

interface Props {
  /** Emoji to render */
  emoji: string[];
  /** Emoji onClick callback */
  onClick: (e: SyntheticEvent) => void;
}

const Emoji: FC<Props> = ({ emoji, onClick }) => {
  const [alias, glyph] = emoji;
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    onClick(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    const { key } = e;
    if (key === "Enter" || key === " ") {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      className={styles.emoji}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      title={alias}
    >
      {glyph}
    </div>
  );
};

export default Emoji;
