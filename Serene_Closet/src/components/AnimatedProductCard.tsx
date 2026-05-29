import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated, Vibration } from 'react-native';
import { Heart } from './Icons';
import { THEME } from '../theme';
import { useTheme } from '../theme/ThemeContext';
import { EditorialImage } from './EditorialImage';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface AnimatedProductCardProps {
  id: string;
  image: string;
  title: string;
  category: string;
  price: string;
  onPress?: () => void;
  index?: number;
}

export const AnimatedProductCard: React.FC<AnimatedProductCardProps> = ({
  image,
  title,
  category,
  price,
  onPress,
  index = 0,
}) => {
  const { colors, isDarkMode } = useTheme();
  const [isLiked, setIsLiked] = React.useState(false);
  
  // Animation values
  const scaleValue = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: THEME.motion.durations.screen,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: THEME.motion.durations.screen,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, index]);

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 6,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  const handleLike = () => {
    Vibration.vibrate(10);
    setIsLiked(!isLiked);
  };

  const handlePress = () => {
    Vibration.vibrate(8);
    if (onPress) onPress();
  };

  return (
    <Animated.View
      style={[
        styles.animatedContainer,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleValue }
          ],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.92}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={handlePress}
        style={[
          styles.container,
          {
            backgroundColor: colors.cardBackground,
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.85)',
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
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleLike}
            style={[
              styles.likeButton,
              {
                backgroundColor: isDarkMode ? 'rgba(11, 43, 38, 0.92)' : 'rgba(255, 255, 255, 0.9)',
                borderColor: colors.border,
              }
            ]}
          >
            <Heart
              size={13}
              color={isLiked ? colors.primaryBurgundy : colors.secondaryText}
              fill={isLiked ? colors.primaryBurgundy : 'transparent'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <Text style={[styles.category, { color: colors.secondaryText }]}>{category}</Text>
          <Text style={[styles.title, { color: colors.darkText }]} numberOfLines={1}>{title}</Text>
          <Text style={[styles.price, { color: colors.primaryBurgundy }]}>{price}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    width: CARD_WIDTH,
    marginBottom: THEME.spacing.lg,
  },
  container: {
    width: '100%',
    borderRadius: THEME.borderRadius.card,
    borderWidth: 0.5,
    padding: THEME.spacing.sm,
    ...THEME.shadows.premium,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.3,
    borderRadius: THEME.borderRadius.card - 6,
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  info: {
    paddingVertical: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.xs,
  },
  category: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  title: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 13.5,
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  price: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
