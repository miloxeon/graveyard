/* eslint-env browser */
import React, { FC, useState, RefObject, SyntheticEvent } from "react";
import createPersistedState from "use-persisted-state";
import { Element as ScrollElement } from "react-scroll";
import generateSupportedEmojiDictionary from "../../lib/generateSupportedEmojiDictionary";
import { RECENTS_KEY, RECENTS_MAX } from "../../lib/constants";
import { match } from "../../lib/helpers";
import Search from "../Search";
import Indicator from "../Indicator";
import PickerSection from "../PickerSection";

import styles from "./styles.module.css";

interface Input {
  target: {
    value: string;
  };
}

interface Props {
  /** Ref of the element to add emojis to */
  inputRef: RefObject<HTMLElement>;
  hidden?: boolean;
}

const dict = generateSupportedEmojiDictionary();

const useRecentsState = createPersistedState(RECENTS_KEY);

const Picker: FC<Props> = ({ inputRef, hidden }) => {
  const allEmojis = Object.values(dict).flat();
  const [currentEmoji, setCurrentEmoji] = useState<string[][]>(allEmojis);
  const [recents, setRecents] = useRecentsState<string[][]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  if (hidden) return null;

  const filterEmoji: (arg0: Input) => void = ({ target: { value } }) => {
    setCurrentEmoji(allEmojis.filter(([alias]) => match(value, alias)));
  };

  const insertEmoji = (currentEmoji: string[]) => (e: SyntheticEvent) => {
    const input = inputRef.current!;
    input.focus();
    document.execCommand("insertText", false, currentEmoji[1]);
    (e.target as HTMLElement).focus();

    if (recents.map(([_, glyph]) => glyph).includes(currentEmoji[1])) return;

    if (recents.length < RECENTS_MAX) {
      setRecents([currentEmoji].concat(recents));
    } else {
      let tempRecents = recents;
      tempRecents = [currentEmoji].concat(tempRecents);
      tempRecents = tempRecents.slice(0, RECENTS_MAX);
      setRecents(tempRecents);
    }
  };

  return (
    <div className={styles.picker}>
      <h1 className={styles.heading}>Emoji</h1>
      <div className={styles.content} id="scrollSpyContainer">
        <Search
          value={searchQuery}
          onChange={({ target: { value } }) => setSearchQuery(value)}
          debouncedAction={filterEmoji}
          reset={() => setSearchQuery("")}
        />

        {searchQuery.length > 0 && (
          <PickerSection emoji={currentEmoji} action={insertEmoji} />
        )}

        {searchQuery.length === 0 && recents.length > 0 && (
          <ScrollElement name={`emojiPicker-Recents`}>
            <PickerSection
              heading="Frequently used"
              id={`emojiPicker-Recents`}
              emoji={recents}
              action={insertEmoji}
            />
          </ScrollElement>
        )}

        {searchQuery.length === 0 &&
          Object.keys(dict).map(category => (
            <ScrollElement key={category} name={`emojiPicker-${category}`}>
              <PickerSection
                id={`emojiPicker-${category}`}
                emoji={dict[category]}
                action={insertEmoji}
                heading={category}
              />
            </ScrollElement>
          ))}
      </div>

      {searchQuery.length === 0 && (
        <Indicator
          categories={["Recents"].concat(Object.keys(dict))}
          disabledCategories={recents.length === 0 ? ["Recents"] : []}
        />
      )}
    </div>
  );
};

export default Picker;
