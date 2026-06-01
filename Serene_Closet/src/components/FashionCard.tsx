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

  const cardStyle = [
    styles.container,
    {
      backgroundColor: colors.cardBackground,
      borderColor: colors.border,
    },
  ];

  const badgeStyle = [
    styles.categoryBadge,
    {
      backgroundColor: isDarkMode ? 'rgba(34, 25, 25, 0.85)' : 'rgba(255, 255, 255, 0.85)',
      borderColor: colors.border,
    },
  ];

  const titleTextStyle = [styles.title, { color: colors.darkText }];
  const subtitleTextStyle = [styles.editorialSub, { color: colors.secondaryText }];
  const categoryTextStyle = [styles.categoryText, { color: colors.primaryBurgundy }];

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress} style={cardStyle}>
      <View style={styles.imageContainer}>
        <EditorialImage
          source={{ uri: image }}
          style={styles.image}
          containerStyle={StyleSheet.absoluteFill}
          enableOverlay={true}
        />
        <View style={badgeStyle}>
          <Text style={categoryTextStyle}>{category}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={titleTextStyle} numberOfLines={1}>{title}</Text>
        <Text style={subtitleTextStyle}>LIMITED EDITION</Text>
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
    fontFamily: THEME.typography.uppercase.fontFamily,
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
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 15.5,
    marginBottom: 2,
    letterSpacing: 0.2,
    fontWeight: '700',
  },
  editorialSub: {
    fontFamily: THEME.typography.uppercase.fontFamily,
    fontSize: 8.5,
    letterSpacing: 1.5,
    fontWeight: '600',
  },
});
