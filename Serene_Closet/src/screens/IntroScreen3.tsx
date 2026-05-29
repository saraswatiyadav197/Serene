import React, { useEffect, useRef } from 'react';
import { SafeLayout } from '../components/SafeLayout';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { THEME } from '../theme';
import { useTheme } from '../theme/ThemeContext';
import { IMAGES } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { LuxuryButton } from '../components/LuxuryButton';
import { EditorialImage } from '../components/EditorialImage';
import AmbientBackground from '../components/AmbientBackground';

const { width } = Dimensions.get('window');

export const IntroScreen3 = ({ navigation }: any) => {
  const { colors, isDarkMode } = useTheme();
  const revealOpacity = useRef(new Animated.Value(0)).current;
  const revealTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(revealOpacity, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.timing(revealTranslateY, {
        toValue: 0,
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <AmbientBackground>
      <SafeLayout
        statusBarMode={isDarkMode ? 'light-content' : 'dark-content'}
        style={[styles.container, { backgroundColor: 'transparent' }]}
        applyBottomInset={true}
      >
        {/* Top right skip */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login')}
          style={styles.skipButtonTop}
        >
          <Text style={[styles.skipTextTop, { color: colors.primaryBurgundy }]}>Enter</Text>
        </TouchableOpacity>

        {/* Model Image inside Arch-style Border */}
        <View style={styles.archWrapper}>
          <View style={[styles.archContainer, { backgroundColor: colors.cardBackground, borderColor: colors.border, shadowColor: isDarkMode ? '#000000' : '#051F20' }]}>
            <EditorialImage
              source={{ uri: IMAGES.intro3 }}
              style={styles.image}
              containerStyle={StyleSheet.absoluteFill}
              enableOverlay={true}
            />
          </View>
        </View>

        {/* Floating white/glass content card at the bottom */}
        <Animated.View style={[
          styles.contentSection,
          {
            opacity: revealOpacity,
            transform: [{ translateY: revealTranslateY }]
          }
        ]}>
          <GlassCard style={styles.floatingCard} opacity={isDarkMode ? 0.82 : 0.92}>
            {/* Progress Indicators */}
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { backgroundColor: colors.border }]} />
              <View style={[styles.progressBar, { backgroundColor: colors.border }]} />
              <View style={[styles.progressBar, { backgroundColor: colors.primaryBurgundy }]} />
            </View>

            <Text style={[styles.heading, { color: colors.darkText }]}>Shop by Your Style</Text>
            
            <Text style={[styles.paragraph, { color: colors.secondaryText }]}>
              Explore and procure exclusive apparel matching your cognitive aesthetic signature. Elevate your catalog matching accuracy instantly.
            </Text>

            <LuxuryButton
              title="Begin Styling"
              onPress={() => navigation.navigate('Login')}
              style={styles.ctaButton}
            />
          </GlassCard>
        </Animated.View>
      </SafeLayout>
    </AmbientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  skipButtonTop: {
    alignSelf: 'flex-end',
    marginTop: THEME.spacing.md,
    marginRight: THEME.spacing.lg,
    padding: THEME.spacing.sm,
    zIndex: 10,
  },
  skipTextTop: {
    fontFamily: 'Georgia',
    fontSize: 10.5,
    letterSpacing: 2.0,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  archWrapper: {
    alignItems: 'center',
    marginTop: THEME.spacing.xs,
    flex: 1,
    justifyContent: 'center',
  },
  archContainer: {
    width: width * 0.70,
    height: width * 0.90,
    borderTopLeftRadius: width * 0.35, // Creates the perfect luxury editorial arch
    borderTopRightRadius: width * 0.35,
    overflow: 'hidden',
    borderWidth: 0.5,
    ...THEME.shadows.premiumDeep,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentSection: {
    paddingHorizontal: 28,
    paddingBottom: 28,
    marginTop: 18,
  },
  floatingCard: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 28 + 4,
    paddingHorizontal: 28,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 16,
    ...THEME.shadows.premiumDeep,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
  },
  progressBar: {
    width: 20,
    height: 2.5,
    marginHorizontal: 3,
    borderRadius: 1.5,
  },
  heading: {
    fontFamily: 'Georgia',
    fontSize: 22,
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: 10,
    fontWeight: '700',
  },
  paragraph: {
    fontFamily: 'Georgia',
    fontSize: 12.5,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 28,
  },
  ctaButton: {
    width: '100%',
  },
});
