import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

export default function DarkModeContextProvider({ children }) {
  const isDefaultDarkMode =
    window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    "isDarkMode",
    isDefaultDarkMode,
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkModeContext() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error(
      "DarkModeContext was used out side of DarkModeContextProvider",
    );
  return context;
}
