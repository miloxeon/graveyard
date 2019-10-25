import emoji from "../data/emoji.json";
import checkEmojiSupport from "./checkEmojiSupport";

interface EmojiDict {
  [category: string]: string[][];
}

export default () => {
  const input: EmojiDict = emoji;
  const result: EmojiDict = {};

  Object.keys(input).forEach(category => {
    if (!result[category]) {
      result[category] = [];
    }

    const emojis = input[category];

    emojis.forEach(currentEmoji => {
      const [alias, glyph] = currentEmoji;
      if (checkEmojiSupport(glyph)) {
        result[category].push([alias, glyph]);
      }
    });
  });

  return result;
};
