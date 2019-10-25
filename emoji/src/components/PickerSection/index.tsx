import React, { FC, SyntheticEvent } from "react";
import Emoji from "../Emoji";
import styles from "./styles.module.css";

interface Props {
  heading?: string;
  /** List of emojis to render */
  emoji: string[][];
  /** Emoji onClick callback */
  action: (emoji: string[]) => (e: SyntheticEvent) => void;
  /** Section id for scrolling */
  id?: string;
}

const PickerSection: FC<Props> = ({ heading, emoji, action, id }) => {
  return (
    <div className={styles.root} id={id}>
      {heading && (
        <div className={styles.stickyContainer}>
          <h2 className={styles.subheading}>{heading}</h2>
        </div>
      )}
      <section className={styles.pickerSection}>
        {emoji.map(currentEmoji => (
          <Emoji
            key={currentEmoji[1]}
            emoji={currentEmoji}
            onClick={action(currentEmoji)}
          />
        ))}
      </section>
    </div>
  );
};

export default PickerSection;
