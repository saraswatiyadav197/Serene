import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Image, ImageProps, Animated, StyleProp, ViewStyle } from 'react-native';
import { THEME } from '../theme';

interface EditorialImageProps extends ImageProps {
  containerStyle?: StyleProp<ViewStyle>;
  overlayColor?: string;
  enableOverlay?: boolean;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  style,
  containerStyle,
  overlayColor = 'rgba(142, 182, 155, 0.05)', // Soft Sage tint overlay
  enableOverlay = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const shimmer = useRef(new Animated.Value(0.4)).current;

  // Shimmer loading animation
  useEffect(() => {
    if (!isLoaded) {
      const shimmerLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(shimmer, {
            toValue: 0.7,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(shimmer, {
            toValue: 0.4,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      );
      shimmerLoop.start();
      return () => shimmerLoop.stop();
    }
  }, [isLoaded, shimmer]);

  const handleLoad = () => {
    setIsLoaded(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: THEME.motion.durations.screen,
      useNativeDriver: true,
    }).start();
  };

  const shimmerStyle = [styles.placeholder, { opacity: shimmer }];
  const animatedImageStyle = [styles.animatedImageContainer, { opacity }];
  const overlayStyle = [
    StyleSheet.absoluteFill,
    styles.overlay,
    { backgroundColor: overlayColor },
  ];

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Animated shimmer placeholder */}
      {!isLoaded && <Animated.View style={shimmerStyle} />}

      <Animated.View style={animatedImageStyle}>
        <Image style={[styles.image, style]} onLoad={handleLoad} {...props} />
        {/* Cinematic warm tone filter */}
        {enableOverlay && isLoaded && (
          <View style={overlayStyle} pointerEvents="none" />
        )}
        {/* Deeper edge vignette for cinematic depth */}
        {enableOverlay && isLoaded && (
          <View style={[StyleSheet.absoluteFill, styles.vignette]} pointerEvents="none" />
        )}
        {/* Inner shadow edge darkening */}
        {enableOverlay && isLoaded && (
          <View style={[StyleSheet.absoluteFill, styles.innerShadow]} pointerEvents="none" />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  animatedImageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#DAF1DE', // Luxury Mint Background
  },
  overlay: {
    backgroundColor: 'rgba(142, 182, 155, 0.05)',
  },
  roundedOverlay: {
    mixBlendMode: 'multiply' as any,
  },
  vignette: {
    backgroundColor: 'transparent',
    borderWidth: 20,
    borderColor: 'rgba(5, 31, 32, 0.025)', // Primary Dark overlay
  },
  innerShadow: {
    borderWidth: 0.5,
    borderColor: 'rgba(5, 31, 32, 0.04)', // Primary Dark overlay
    borderRadius: 2,
  },
});
