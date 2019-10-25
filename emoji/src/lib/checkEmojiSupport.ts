const getRenderedDimensions = (
  symbol: string
): { width: number; height: number } => {
  const tester = document.getElementById("emojiTester");
  if (!tester) throw new Error("You forgot to put tester element into body.");
  tester.innerHTML = symbol;
  const { width, height } = tester.getBoundingClientRect();
  tester.innerHTML = "";
  return { width, height };
};

export default (emoji: string): boolean => {
  const {
    width: referenceWidth,
    height: referenceHeight
  } = getRenderedDimensions("😀");
  const { width: resultWidth, height: resultHeight } = getRenderedDimensions(
    emoji
  );
  return referenceHeight === resultHeight && referenceWidth === resultWidth;
};
