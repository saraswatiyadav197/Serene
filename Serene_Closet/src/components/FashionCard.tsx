import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Vibration } from 'react-native';
import { THEME } from '../theme';
import { useTheme } from '../theme/ThemeContext';
import { EditorialImage } from './EditorialImage';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.68;

interface FashionCardProps {
  image: string;
  title: string;
  category: string;
  onPress?: () => void;
}

export const FashionCard: React.FC<FashionCardProps> = ({
  image,
  title,
  category,
  onPress,
}) => {
  const { colors, isDarkMode } = useTheme();

  const handlePress = () => {
    Vibration.vibrate(8);
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      style={[
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
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
        <View 
          style={[
            styles.categoryBadge,
            {
              backgroundColor: isDarkMode ? 'rgba(34, 25, 25, 0.85)' : 'rgba(255, 255, 255, 0.85)',
              borderColor: colors.border,
            }
          ]}
        >
          <Text style={[styles.categoryText, { color: colors.primaryBurgundy }]}>{category}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.darkText }]} numberOfLines={1}>{title}</Text>
        <Text style={[styles.editorialSub, { color: colors.secondaryText }]}>LIMITED EDITION</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginRight: THEME.spacing.md,
    borderRadius: THEME.borderRadius.card,
    borderWidth: 0.5,
    padding: THEME.spacing.sm,
    ...THEME.shadows.premium,
    marginBottom: THEME.spacing.sm,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.2,
    borderRadius: THEME.borderRadius.card - 4,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: THEME.spacing.sm,
    left: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.sm + 2,
    paddingVertical: THEME.spacing.xs,
    borderRadius: 28,
    borderWidth: 0.5,
  },
  categoryText: {
    fontFamily: 'Georgia',
    fontSize: 8.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  info: {
    paddingVertical: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.xs,
  },
  title: {
    fontFamily: 'Georgia',
    fontSize: 15.5,
    marginBottom: 2,
    letterSpacing: 0.2,
    fontWeight: '700',
  },
  editorialSub: {
    fontFamily: 'Georgia',
    fontSize: 8.5,
    letterSpacing: 1.5,
    fontWeight: '600',
  },
});
