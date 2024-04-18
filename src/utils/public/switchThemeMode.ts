import localStorageAvailable from "./localStorageAvailable";
import getThemeMode, { themeModeStorage } from "./getThemeMode";

const switchThemeMode = () => {
  if (localStorageAvailable() === false) {
    return;
  }

  const currentTheme = getThemeMode();

  const { key, dark, light } = themeModeStorage;

  localStorage.removeItem(key);

  if (currentTheme === dark) {
    localStorage.setItem(key, light);
  } else if (currentTheme === light) {
    localStorage.setItem(key, dark);
  }
};

export default switchThemeMode;
