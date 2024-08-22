import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../../Theme/Theme";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(
    colorScheme === "dark" ? darkTheme : lightTheme
  );

  useEffect(() => {
    console.log(colorScheme);
    setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === darkTheme ? lightTheme : darkTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
