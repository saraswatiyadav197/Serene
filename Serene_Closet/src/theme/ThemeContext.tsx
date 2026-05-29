import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { THEME } from './index';

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: typeof THEME.colors;
  theme: typeof THEME;
}

const ThemeContext = createContext<ThemeContextProps>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  colors: THEME.colors,
  theme: THEME,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Derive colors for light and dark palettes
  const activeColors = isDarkMode
    ? {
        ...THEME.colors,
        primaryBurgundy: THEME.colors.dark.primaryBurgundy,
        softBeigeBackground: THEME.colors.dark.background,
        cardBackground: THEME.colors.dark.card,
        darkText: THEME.colors.dark.darkText,
        secondaryText: THEME.colors.dark.secondaryText,
        border: THEME.colors.dark.border,
        borderLight: THEME.colors.dark.borderLight,
        whiteGlass: THEME.colors.dark.whiteGlass,
        shadow: THEME.colors.dark.shadow,
        gold: THEME.colors.dark.gold,
      }
    : THEME.colors;

  const activeAtmosphere = isDarkMode
    ? {
        ambientGradient: { start: '#051F20', end: '#010B09' }, // deep dark emerald base
        vignette: 'rgba(1, 11, 9, 0.52)', // smoky green vignette
        filmGrain: 'rgba(255, 255, 255, 0.012)', // subtle white grain for dark screens
        heroGlow: 'rgba(35, 83, 71, 0.18)', // muted emerald glow
        scannerVignette: 'rgba(0, 0, 0, 0.65)',
      }
    : THEME.atmosphere;

  const activeTheme = {
    ...THEME,
    colors: activeColors,
    atmosphere: activeAtmosphere,
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        colors: activeColors,
        theme: activeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
