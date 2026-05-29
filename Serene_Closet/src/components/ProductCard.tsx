import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Vibration } from 'react-native';
import { Heart } from './Icons';
import { THEME } from '../theme';
import { EditorialImage } from './EditorialImage';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // Two column layout with padding

interface ProductCardProps {
  image: string;
  title: string;
  category: string;
  price: string;
  onPress?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  category,
  price,
  onPress,
}) => {
  const [isLiked, setIsLiked] = React.useState(false);

  const handleLike = () => {
    Vibration.vibrate(10);
    setIsLiked(!isLiked);
  };

  const handlePress = () => {
    Vibration.vibrate(8);
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={handlePress}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <EditorialImage
          source={{ uri: image }}
          style={styles.image}
          containerStyle={StyleSheet.absoluteFill}
          enableOverlay={true}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLike}
          style={styles.likeButton}
        >
          <Heart
            size={13}
            color={isLiked ? THEME.colors.primaryBurgundy : THEME.colors.secondaryText}
            fill={isLiked ? THEME.colors.primaryBurgundy : 'transparent'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: THEME.spacing.lg,
    backgroundColor: THEME.colors.cardBackground,
    borderRadius: THEME.borderRadius.card,
    borderWidth: 0.5,
    borderColor: THEME.colors.border,
    padding: THEME.spacing.sm,
    ...THEME.shadows.premium,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.3,
    borderRadius: THEME.borderRadius.card - 4,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  likeButton: {
    position: 'absolute',
    top: THEME.spacing.sm,
    right: THEME.spacing.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: THEME.colors.border,
  },
  info: {
    paddingVertical: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.xs,
  },
  category: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 8.5,
    letterSpacing: 1.2,
    color: THEME.colors.secondaryText,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  title: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 13.5,
    color: THEME.colors.darkText,
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  price: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 12,
    color: THEME.colors.primaryBurgundy,
    letterSpacing: 0.5,
  },
});
