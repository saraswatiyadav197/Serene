import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, ViewStyle } from 'react-native';
import { Search, SlidersHorizontal } from './Icons';
import { THEME } from '../theme';
import { useTheme } from '../theme/ThemeContext';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onFilterPress?: () => void;
  style?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search luxury collections...',
  value,
  onChangeText,
  onFilterPress,
  style,
}) => {
  const { colors } = useTheme();

  const dynamicInputStyle = {
    backgroundColor: colors.cardBackground,
    borderColor: colors.border,
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.searchSection, dynamicInputStyle]}>
        <Search size={18} color={colors.secondaryText} style={styles.searchIcon} />
        <TextInput
          style={[styles.input, { color: colors.darkText }]}
          placeholder={placeholder}
          placeholderTextColor={colors.secondaryText}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      {onFilterPress && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onFilterPress}
          style={[styles.filterButton, dynamicInputStyle]}
        >
          <SlidersHorizontal size={18} color={colors.primaryBurgundy} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: THEME.spacing.md,
  },
  searchSection: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: THEME.spacing.md,
    ...THEME.shadows.premium,
  },
  searchIcon: {
    marginRight: THEME.spacing.sm,
  },
  input: {
    flex: 1,
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 14,
    padding: 0,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    marginLeft: THEME.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    ...THEME.shadows.premium,
  },
});
