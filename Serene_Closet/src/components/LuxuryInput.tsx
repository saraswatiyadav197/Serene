import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { THEME } from '../theme';
import { useTheme } from '../theme/ThemeContext';

interface LuxuryInputProps extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  error?: string;
}

export const LuxuryInput: React.FC<LuxuryInputProps> = ({
  label,
  containerStyle,
  inputStyle,
  error,
  secureTextEntry,
  ...props
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const inputContainerStyle = {
    backgroundColor: colors.cardBackground,
    borderColor: colors.border,
  };

  const focusStyle = {
    borderColor: colors.primaryBurgundy,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, { color: colors.darkText }]}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          inputContainerStyle,
          isFocused && focusStyle,
          error ? styles.inputError : null,
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.darkText }, inputStyle]}
          placeholderTextColor={colors.secondaryText}
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: THEME.spacing.md,
    width: '100%',
  },
  label: {
    fontFamily: 'Georgia',
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: THEME.spacing.xs,
    marginLeft: THEME.spacing.xs,
    fontWeight: '700',
  },
  inputContainer: {
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: THEME.spacing.md,
    justifyContent: 'center',
    ...THEME.shadows.premium,
  },
  inputError: {
    borderColor: '#D32F2F',
  },
  input: {
    fontFamily: 'Georgia',
    fontSize: 14,
    padding: 0,
  },
  errorText: {
    fontSize: 11,
    color: '#D32F2F',
    marginTop: THEME.spacing.xs,
    marginLeft: THEME.spacing.xs,
    fontFamily: 'Georgia',
  },
});
