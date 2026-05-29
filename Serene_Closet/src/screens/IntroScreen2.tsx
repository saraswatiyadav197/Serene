import React, { useEffect, useRef } from 'react';
import { SafeLayout } from '../components/SafeLayout';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { Cpu, Check } from '../components/Icons';
import { THEME } from '../theme';
import { useTheme } from '../theme/ThemeContext';
import { IMAGES } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { LuxuryButton } from '../components/LuxuryButton';
import { EditorialImage } from '../components/EditorialImage';
import AmbientBackground from '../components/AmbientBackground';

export const IntroScreen2 = ({ navigation }: any) => {
  const { colors, isDarkMode } = useTheme();
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslateY, {
        toValue: 0,
        duration: 600,
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
        {/* Top half: Cinematic Fashion Image with AI floating overlay */}
        <View style={[styles.imageSection, { shadowColor: isDarkMode ? '#000000' : '#051F20' }]}>
          <EditorialImage
            source={{ uri: IMAGES.intro2 }}
            style={styles.image}
            containerStyle={StyleSheet.absoluteFill}
            enableOverlay={true}
          />
          <View style={[styles.imageOverlay, isDarkMode && { backgroundColor: 'rgba(5, 31, 32, 0.35)' }]} />
          
          {/* Style Analyzed Floating Glass Card */}
          <GlassCard style={styles.aiOverlayCard} opacity={isDarkMode ? 0.82 : 0.88}>
            <View style={styles.aiHeader}>
              <Cpu size={14} color={colors.primaryBurgundy} />
              <Text style={[styles.aiHeaderText, { color: colors.primaryBurgundy }]}>STYLE ANALYZED</Text>
            </View>
            <Text style={[styles.aiTitle, { color: colors.darkText }]}>Minimalist Chic</Text>
            
            <View style={styles.progressRow}>
              <View style={[styles.fullProgress, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(22, 56, 50, 0.1)' }]}>
                <View style={[styles.activeProgress, { backgroundColor: colors.primaryBurgundy }]} />
              </View>
              <Text style={[styles.progressPercent, { color: colors.primaryBurgundy }]}>85%</Text>
            </View>
            <View style={styles.statusRow}>
              <Check size={11} color={colors.primaryBurgundy} />
              <Text style={[styles.statusText, { color: colors.secondaryText }]}>Generating customized look...</Text>
            </View>
          </GlassCard>
        </View>

        {/* Bottom half: Editorial Details */}
        <Animated.View style={[
          styles.contentSection,
          {
            opacity: contentOpacity,
            transform: [{ translateY: contentTranslateY }]
          }
        ]}>
          {/* Progress Indicators */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]} />
            <View style={[styles.progressBar, { backgroundColor: colors.primaryBurgundy }]} />
            <View style={[styles.progressBar, { backgroundColor: colors.border }]} />
          </View>

          <Text style={[styles.heading, { color: colors.darkText }]}>AI Outfit Suggestions</Text>
          
          <Text style={[styles.paragraph, { color: colors.secondaryText }]}>
            Let our cognitive network create tailored outfits from your digitized clothes and local atmospheric conditions. Step out in style daily.
          </Text>

          <LuxuryButton
            title="Continue"
            onPress={() => navigation.navigate('Intro3')}
            style={styles.ctaButton}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Login')}
            style={styles.skipTextContainer}
          >
            <Text style={[styles.skipTextBottom, { color: colors.secondaryText }]}>Skip</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeLayout>
    </AmbientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageSection: {
    flex: 5.5,
    marginHorizontal: 18,
    marginTop: 10,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    ...THEME.shadows.premiumDeep,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFill,
  },
  aiOverlayCard: {
    position: 'absolute',
    bottom: 18,
    left: 18,
    right: 18,
    padding: 18,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs,
  },
  aiHeaderText: {
    fontFamily: 'Georgia',
    fontSize: 8.5,
    letterSpacing: 1.5,
    marginLeft: 6,
    fontWeight: '700',
  },
  aiTitle: {
    fontFamily: 'Georgia',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '700',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs,
  },
  fullProgress: {
    flex: 1,
    height: 3,
    borderRadius: 1.5,
    marginRight: 10,
  },
  activeProgress: {
    width: '85%',
    height: '100%',
    borderRadius: 1.5,
  },
  progressPercent: {
    fontFamily: 'Georgia',
    fontSize: 9.5,
    fontWeight: '700',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontFamily: 'Georgia',
    fontSize: 9.5,
    marginLeft: 4,
    fontWeight: '600',
  },
  contentSection: {
    flex: 4.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 36,
    paddingVertical: 28,
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
    marginBottom: 10,
  },
  skipTextContainer: {
    paddingVertical: 6,
  },
  skipTextBottom: {
    fontFamily: 'Georgia',
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});
