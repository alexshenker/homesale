import company from "@/utils/constants/company";
import localStorageAvailable from "./localStorageAvailable";

const key = `${company}-theme`;
const light = "light";
const dark = "dark";

const themeModeOptions = [light, dark] as const;
export type ThemeMode = (typeof themeModeOptions)[number];

export const themeModeStorage: {
  key: typeof key;
  [light]: ThemeMode;
  [dark]: ThemeMode;
} = {
  key,
  light,
  dark,
};

const getThemeMode = (): ThemeMode => {
  if (localStorageAvailable() === false) {
    return systemThemeMode();
  }

  const desiredTheme =
    localStorage.getItem(themeModeStorage.key) ?? systemThemeMode();

  return desiredTheme as ThemeMode;
};

export default getThemeMode;

const systemThemeMode = (): ThemeMode => {
  if (typeof window === "undefined") {
    return light;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? themeModeStorage.dark
    : themeModeStorage.light;
};
