import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle, Vibration } from 'react-native';
import { Sparkles, ArrowRight } from './Icons';
import { THEME } from '../theme';
import { useTheme } from '../theme/ThemeContext';
import { GlassCard } from './GlassCard';
import { EditorialImage } from './EditorialImage';

interface AIRecommendationCardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({
  title = 'Minimalist Chic',
  subtitle = 'Curated Daily Look',
  image = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800',
  onPress,
  style,
}) => {
  const { colors, isDarkMode } = useTheme();

  const handlePress = () => {
    Vibration.vibrate(10);
    if (onPress) onPress();
  };

  const containerStyles = [
    styles.container,
    {
      backgroundColor: colors.cardBackground,
      borderColor: colors.border,
      shadowColor: isDarkMode ? '#000000' : '#051F20',
    },
    style,
  ];

  const gradientOverlayStyle = [
    styles.gradientOverlay,
    isDarkMode ? styles.gradientOverlayDark : undefined,
  ];

  const badgeTextStyle = [
    styles.badgeText,
    { color: colors.primaryBurgundy },
  ];

  const titleStyle = [
    styles.title,
    { color: colors.darkText },
  ];

  const subtitleStyle = [
    styles.subtitle,
    { color: colors.secondaryText },
  ];

  const actionTextStyle = [
    styles.actionText,
    { color: colors.primaryBurgundy },
  ];

  return (
    <TouchableOpacity activeOpacity={0.96} onPress={handlePress} style={containerStyles}>
      <View style={styles.imageContainer}>
        <EditorialImage
          source={{ uri: image }}
          style={styles.image}
          containerStyle={StyleSheet.absoluteFill}
          enableOverlay={true}
        />
        <View style={gradientOverlayStyle} />
        <GlassCard style={styles.floatingCard} opacity={isDarkMode ? 0.82 : 0.88}>
          <View style={styles.badgeContainer}>
            <Sparkles size={11} color={colors.primaryBurgundy} fill={colors.primaryBurgundy} />
            <Text style={badgeTextStyle}>AI STYLIST PICK</Text>
          </View>
          <Text style={titleStyle}>{title}</Text>
          <Text style={subtitleStyle}>{subtitle}</Text>
          <View style={styles.actionContainer}>
            <Text style={actionTextStyle}>Discover details</Text>
            <ArrowRight size={11} color={colors.primaryBurgundy} />
          </View>
        </GlassCard>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: THEME.spacing.md,
    borderRadius: THEME.borderRadius.card,
    overflow: 'hidden',
    borderWidth: 0.5,
    ...THEME.shadows.premiumDeep,
    marginBottom: THEME.spacing.lg,
  },
  imageContainer: {
    width: '100%',
    height: 380,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(5, 31, 32, 0.22)',
  },
  gradientOverlayDark: {
    backgroundColor: 'rgba(10, 6, 6, 0.35)',
  },
  floatingCard: {
    margin: THEME.spacing.md,
    padding: THEME.spacing.md,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    ...THEME.shadows.premiumDeep,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs,
  },
  badgeText: {
    fontFamily: THEME.typography.uppercase.fontFamily,
    fontSize: 8.5,
    letterSpacing: 1.5,
    marginLeft: 6,
    fontWeight: '700',
  },
  title: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 20,
    marginBottom: 2,
    fontWeight: '700',
  },
  subtitle: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 11.5,
    marginBottom: THEME.spacing.sm,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: THEME.typography.uppercase.fontFamily,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginRight: 6,
    fontWeight: '700',
  },
});
