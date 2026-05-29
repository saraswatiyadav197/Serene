import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Vibration } from 'react-native';
import { Calendar } from './Icons';
import { THEME } from '../theme';
import { useTheme } from '../theme/ThemeContext';
import { EditorialImage } from './EditorialImage';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface WardrobeCardProps {
  image: string;
  title: string;
  category: string;
  lastWorn?: string;
  wearCount?: number;
  onPress?: () => void;
}

export const WardrobeCard: React.FC<WardrobeCardProps> = ({
  image,
  title,
  category,
  lastWorn = 'Never worn',
  wearCount = 0,
  onPress,
}) => {
  const { colors, isDarkMode } = useTheme();

  const handlePress = () => {
    Vibration.vibrate(8);
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={handlePress}
      style={[
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          shadowColor: isDarkMode ? '#000000' : '#051F20',
        }
      ]}
    >
      <View style={styles.imageContainer}>
        <EditorialImage
          source={{ uri: image }}
          style={styles.image}
          containerStyle={StyleSheet.absoluteFill}
          enableOverlay={true}
        />
        <View style={[styles.wearBadge, { backgroundColor: isDarkMode ? 'rgba(11, 43, 38, 0.72)' : 'rgba(5, 31, 32, 0.72)' }]}>
          <Text style={[styles.wearCount, { color: isDarkMode ? '#DAF1DE' : colors.cardBackground }]}>{wearCount} wears</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={[styles.category, { color: colors.secondaryText }]}>{category}</Text>
        <Text style={[styles.title, { color: colors.darkText }]} numberOfLines={1}>{title}</Text>
        
        <View style={styles.statsContainer}>
          <Calendar size={11} color={colors.secondaryText} style={styles.statIcon} />
          <Text style={[styles.lastWornText, { color: colors.secondaryText }]} numberOfLines={1}>Worn: {lastWorn}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: THEME.spacing.md + 4,
    borderRadius: THEME.borderRadius.card,
    borderWidth: 0.5,
    padding: THEME.spacing.sm,
    ...THEME.shadows.premium,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.25,
    borderRadius: THEME.borderRadius.card - 4,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wearBadge: {
    position: 'absolute',
    bottom: THEME.spacing.sm,
    right: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: THEME.spacing.xs - 2,
    borderRadius: 28,
  },
  wearCount: {
    fontFamily: 'Georgia',
    fontSize: 8.5,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  info: {
    paddingVertical: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.xs,
  },
  category: {
    fontFamily: 'Georgia',
    fontSize: 8.5,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 2,
    fontWeight: '600',
  },
  title: {
    fontFamily: 'Georgia',
    fontSize: 13.5,
    marginBottom: THEME.spacing.xs,
    letterSpacing: 0.2,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statIcon: {
    marginRight: 4,
  },
  lastWornText: {
    fontFamily: 'Georgia',
    fontSize: 10.5,
  },
});
