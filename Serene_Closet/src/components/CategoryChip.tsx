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

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.chip,
        inactiveChipStyle,
        isActive && activeChipStyle,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: colors.secondaryText },
          isActive && { color: isDarkMode ? '#140F0F' : colors.cardBackground },
          textStyle,
        ]}
      >
        {label}
      </Text>
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
    fontFamily: 'Georgia',
    fontSize: 13,
    letterSpacing: 0.8,
    fontWeight: '600',
  },
});
