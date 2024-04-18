const copy = (text: string): void => {
  if (
    typeof window === "undefined" ||
    typeof window.navigator === "undefined"
  ) {
    return;
  }

  navigator.clipboard.writeText(text);
};

export default copy;
