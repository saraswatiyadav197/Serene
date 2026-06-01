import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme, View, ActivityIndicator, StyleSheet } from 'react-native';
import { THEME } from './index';
import { useFonts as usePlayfair, PlayfairDisplay_400Regular, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { useFonts as useInter, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';

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
  const [pfLoaded] = usePlayfair({ PlayfairDisplay_400Regular, PlayfairDisplay_700Bold });
  const [interLoaded] = useInter({ Inter_400Regular, Inter_600SemiBold });

  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Derive colors for light and dark palettes and provide backward-compatible aliases
  const baseColors = isDarkMode ? THEME.colors.dark : THEME.colors;

  const activeColors = {
    ...baseColors,
    // Backwards compatible keys used across the codebase
    primaryBurgundy: baseColors.primaryBurgundy ?? THEME.colors.primaryBurgundy,
    softBeigeBackground: baseColors.softCreamBackground ?? THEME.colors.softCreamBackground,
    cardBackground: baseColors.card ?? baseColors.softCreamBackground ?? THEME.colors.softCreamBackground,
    darkText: baseColors.darkText ?? baseColors.textDarkCharcoal ?? '#222222',
    secondaryText: baseColors.secondaryText ?? THEME.colors.secondaryText,
    border: baseColors.border ?? THEME.colors.border,
    borderLight: baseColors.borderLight ?? THEME.colors.borderLight,
    whiteGlass: baseColors.whiteGlass ?? THEME.colors.whiteGlass,
    shadow: baseColors.shadow ?? THEME.colors.shadow,
    gold: baseColors.accentGold ?? THEME.colors.accentGold,
    white: baseColors.white ?? '#FFFFFF',
    transparent: 'transparent',
    overlay: baseColors.overlay ?? THEME.colors.overlay,
  } as any;

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

  // Wait for fonts to load before rendering app to avoid layout shifts
  if (!pfLoaded || !interLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

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

const styles = StyleSheet.create({
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
