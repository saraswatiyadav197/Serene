import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { ArrowRight } from './Icons'; // ArrowRight can be rotated or we can draw standard arrow
import { THEME } from '../theme';

interface EditorialHeaderProps {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const EditorialHeader: React.FC<EditorialHeaderProps> = ({
  title,
  subtitle,
  onBackPress,
  rightComponent,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftRow}>
        {onBackPress && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onBackPress}
            style={styles.backButton}
          >
            {/* Displaying standard back arrow by rotating right arrow by 180 deg */}
            <View style={styles.rotatedArrow}>
              <ArrowRight size={16} color={THEME.colors.darkText} />
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle.toUpperCase()}</Text>}
        </View>
      </View>
      {rightComponent && <View style={styles.rightContainer}>{rightComponent}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.md,
    backgroundColor: 'transparent',
    width: '100%',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.md,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 24,
    color: THEME.colors.darkText,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    letterSpacing: 1.5,
    color: THEME.colors.secondaryText,
    marginTop: 2,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: THEME.spacing.md,
  },
  rotatedArrow: {
    transform: [{ rotate: '180deg' }],
  },
});
