import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderWidth?: number;
  opacity?: number;
  showInnerLight?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  borderWidth = 0.5,
  opacity = 0.72,
  showInnerLight = true,
  ...props
}) => {
  const { isDarkMode, theme } = useTheme();

  // Adapt colors for light or dark cinematic styles
  const baseBg = isDarkMode ? `rgba(11, 43, 38, ${opacity})` : `rgba(218, 241, 222, ${opacity})`;
  const borderColor = isDarkMode ? 'rgba(142, 182, 155, 0.12)' : 'rgba(255, 255, 255, 0.75)';
  const innerLightColor = isDarkMode ? 'rgba(142, 182, 155, 0.18)' : 'rgba(255, 255, 255, 0.45)';

  const activeShadows = isDarkMode
    ? {
        shadowColor: '#051F20',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.35,
        shadowRadius: 28,
        elevation: 8,
      }
    : theme.shadows.premiumDeep;

  const cardStyle = [
    styles.card,
    activeShadows,
    {
      backgroundColor: baseBg,
      borderColor: borderColor,
      borderWidth: borderWidth,
    },
    style,
  ];

  const innerLightStyle = [
    styles.innerLightReflection,
    { backgroundColor: innerLightColor },
  ];

  const warmInnerTintStyle = [
    styles.warmInnerTint,
    { backgroundColor: isDarkMode ? 'rgba(35, 83, 71, 0.015)' : 'rgba(22, 56, 50, 0.012)' },
  ];

  return (
    <View style={cardStyle} {...props}>
      {/* Inner top light reflection — luxury frosted glass effect */}
      {showInnerLight && <View style={innerLightStyle} pointerEvents="none" />}
      {/* Subtle warm inner tint layer */}
      <View style={warmInnerTintStyle} pointerEvents="none" />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 18,
    overflow: 'hidden',
    position: 'relative',
  },
  innerLightReflection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  warmInnerTint: {
    ...StyleSheet.absoluteFill,
    borderRadius: 16,
  },
});
