import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { THEME } from '../theme';

interface SafeLayoutProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  statusBarMode?: 'dark-content' | 'light-content';
  statusBarTranslucent?: boolean;
  statusBarColor?: string;
  applyBottomInset?: boolean;
  applyTopInset?: boolean;
  backgroundColor?: string;
}

export const SafeLayout: React.FC<SafeLayoutProps> = ({
  children,
  style,
  statusBarMode = 'dark-content',
  statusBarTranslucent = true,
  statusBarColor = 'transparent',
  applyBottomInset = false,
  applyTopInset = true,
  backgroundColor = THEME.colors.softBeigeBackground,
}) => {
  const insets = useSafeAreaInsets();

  // If a screen is using absolute/image background layouts, it can request transparent background
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: applyTopInset ? insets.top : 0,
          paddingBottom: applyBottomInset ? insets.bottom : 0,
          backgroundColor: backgroundColor,
        },
        style,
      ]}
    >
      <StatusBar
        style={statusBarMode === 'light-content' ? 'light' : 'dark'}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
