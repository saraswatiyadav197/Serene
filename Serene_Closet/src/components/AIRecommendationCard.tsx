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

  return (
    <TouchableOpacity
      activeOpacity={0.96}
      onPress={handlePress}
      style={[
        styles.container, 
        { 
          backgroundColor: colors.cardBackground, 
          borderColor: colors.border,
          shadowColor: isDarkMode ? '#000000' : '#051F20',
        }, 
        style
      ]}
    >
      <View style={styles.imageContainer}>
        <EditorialImage
          source={{ uri: image }}
          style={styles.image}
          containerStyle={StyleSheet.absoluteFill}
          enableOverlay={true}
        />
        <View style={[styles.gradientOverlay, isDarkMode && { backgroundColor: 'rgba(10, 6, 6, 0.35)' }]} />
        
        <GlassCard style={styles.floatingCard} opacity={isDarkMode ? 0.82 : 0.88}>
          <View style={styles.badgeContainer}>
            <Sparkles size={11} color={colors.primaryBurgundy} fill={colors.primaryBurgundy} />
            <Text style={[styles.badgeText, { color: colors.primaryBurgundy }]}>AI STYLIST PICK</Text>
          </View>
          <Text style={[styles.title, { color: colors.darkText }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: colors.secondaryText }]}>{subtitle}</Text>
          <View style={styles.actionContainer}>
            <Text style={[styles.actionText, { color: colors.primaryBurgundy }]}>Discover details</Text>
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
    fontFamily: 'Georgia',
    fontSize: 8.5,
    letterSpacing: 1.5,
    marginLeft: 6,
    fontWeight: '700',
  },
  title: {
    fontFamily: 'Georgia',
    fontSize: 20,
    marginBottom: 2,
    fontWeight: '700',
  },
  subtitle: {
    fontFamily: 'Georgia',
    fontSize: 11.5,
    marginBottom: THEME.spacing.sm,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: 'Georgia',
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginRight: 6,
    fontWeight: '700',
  },
});
