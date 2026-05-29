import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sparkles } from '../components/Icons';
import { THEME } from '../theme';
import { useTheme } from '../theme/ThemeContext';
import { IMAGES } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { LuxuryButton } from '../components/LuxuryButton';
import { SafeLayout } from '../components/SafeLayout';
import { EditorialImage } from '../components/EditorialImage';
import AmbientBackground from '../components/AmbientBackground';

type IntroScreen1Props = {
  navigation: any;
};

export const IntroScreen1 = ({ navigation }: IntroScreen1Props): React.JSX.Element => {
  const insets = useSafeAreaInsets();
  const { colors, isDarkMode } = useTheme();
  
  // Staggered text fade-up animation values
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslateY = useRef(new Animated.Value(24)).current;
  const skipOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(skipOpacity, {
        toValue: 1,
        duration: THEME.motion.durations.screen,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.timing(cardTranslateY, {
        toValue: 0,
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <AmbientBackground showGlow={false}>
      <View style={{ flex: 1 }}>
        {/* Editorial campaign background image */}
        <EditorialImage
          source={{ uri: IMAGES.intro1 }}
          style={styles.backgroundImage}
          containerStyle={StyleSheet.absoluteFill}
          enableOverlay={true}
        />
        <View style={[styles.overlay, isDarkMode && { backgroundColor: 'rgba(5, 31, 32, 0.6)' }]} />

        <SafeLayout
          statusBarMode="light-content"
          style={[styles.container, { backgroundColor: 'transparent' }]}
          applyBottomInset={true}
          applyTopInset={false}
          backgroundColor="transparent"
        >
          {/* Progress Indicators */}
          <View style={[styles.progressContainer, { marginTop: insets.top + 18 }]}>
            <View style={[styles.progressBar, styles.progressBarActive]} />
            <View style={styles.progressBar} />
            <View style={styles.progressBar} />
          </View>

          {/* Skip button at top right, fully notch-aware */}
          <Animated.View style={{ opacity: skipOpacity }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Login')}
              style={[styles.skipButtonTop, { top: insets.top + 10 - 4 }]}
            >
              <Text style={styles.skipTextTop}>Skip</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Centered Luxury Card */}
          <Animated.View style={[
            styles.cardContainer,
            {
              opacity: cardOpacity,
              transform: [{ translateY: cardTranslateY }]
            }
          ]}>
            <GlassCard style={styles.card} opacity={isDarkMode ? 0.82 : 0.92}>
              <View style={[styles.iconCircle, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(22, 56, 50, 0.05)', borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(22, 56, 50, 0.12)' }]}>
                <Sparkles size={22} color={colors.primaryBurgundy} fill={colors.primaryBurgundy} />
              </View>

              <Text style={[styles.heading, { color: colors.darkText }]}>Build Your Smart Wardrobe</Text>

              <Text style={[styles.paragraph, { color: colors.secondaryText }]}>
                Step into the future of luxury styling. Curate, analyze, and optimize your personal collections with AI fabric material intelligence.
              </Text>

              <LuxuryButton
                title="Next Journey"
                onPress={() => navigation.navigate('Intro2')}
                style={styles.ctaButton}
              />

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Login')}
                style={styles.skipTextContainer}
              >
                <Text style={[styles.skipTextBottom, { color: colors.secondaryText }]}>Skip for now</Text>
              </TouchableOpacity>
            </GlassCard>
          </Animated.View>
        </SafeLayout>
      </View>
    </AmbientBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(5, 31, 32, 0.44)',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 36,
  },
  progressBar: {
    flex: 1,
    height: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
    borderRadius: 1.5,
  },
  progressBarActive: {
    backgroundColor: '#FFFFFF',
  },
  skipButtonTop: {
    position: 'absolute',
    right: 28,
    padding: 10,
    zIndex: 99,
  },
  skipTextTop: {
    fontFamily: 'Georgia',
    color: '#FFFFFF',
    fontSize: 10.5,
    letterSpacing: 2.0,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  card: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 28,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 0.5,
  },
  heading: {
    fontFamily: 'Georgia',
    fontSize: 22,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 30,
    marginBottom: 10,
    fontWeight: '700',
  },
  paragraph: {
    fontFamily: 'Georgia',
    fontSize: 12.5,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 36,
  },
  ctaButton: {
    width: '100%',
    marginBottom: 10,
  },
  skipTextContainer: {
    paddingVertical: 6,
  },
  skipTextBottom: {
    fontFamily: 'Georgia',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});
