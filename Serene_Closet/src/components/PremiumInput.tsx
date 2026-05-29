import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TextInputProps, Animated } from 'react-native';
import { THEME } from '../theme';

interface PremiumInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const PremiumInput: React.FC<PremiumInputProps> = ({
  label,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [focusAnim] = useState(new Animated.Value(0));

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const borderBottomColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(142, 182, 155, 0.4)', THEME.colors.primaryBurgundy],
  });

  const borderBottomWidth = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.8],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
      <Animated.View
        style={[
          styles.inputWrapper,
          {
            borderBottomColor: borderBottomColor,
            borderBottomWidth: borderBottomWidth,
          },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(35, 83, 71, 0.45)"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </Animated.View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: THEME.spacing.lg,
    width: '100%',
  },
  label: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 2,
    color: THEME.colors.secondaryText,
    marginBottom: THEME.spacing.xs,
  },
  inputWrapper: {
    paddingVertical: THEME.spacing.xs,
  },
  input: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 14,
    color: THEME.colors.darkText,
    padding: 0,
    height: 28,
  },
  errorText: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 10,
    color: THEME.colors.primaryBurgundy,
    marginTop: 4,
    letterSpacing: 0.5,
  },
});
