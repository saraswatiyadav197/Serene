import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { THEME } from '../theme';
import { useTheme } from '../theme/ThemeContext';

interface CategoryChipProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  label,
  isActive,
  onPress,
  style,
  textStyle,
}) => {
  const { colors, isDarkMode } = useTheme();

  const activeChipStyle = {
    backgroundColor: colors.primaryBurgundy,
    borderColor: colors.primaryBurgundy,
  };

  const inactiveChipStyle = {
    borderColor: colors.border,
  };

  const textColorStyle = { color: colors.secondaryText };
  const activeTextColorStyle = isActive
    ? { color: isDarkMode ? '#140F0F' : colors.cardBackground }
    : undefined;

  const labelStyle = [
    styles.text,
    textColorStyle,
    activeTextColorStyle,
    textStyle,
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.chip, inactiveChipStyle, isActive && activeChipStyle, style]}
    >
      <Text style={labelStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 28,
    backgroundColor: 'transparent',
    borderWidth: 1,
    marginRight: 10,
  },
  text: {
    fontFamily: THEME.typography.uppercase.fontFamily,
    fontSize: 13,
    letterSpacing: 0.8,
    fontWeight: '600',
  },
});
