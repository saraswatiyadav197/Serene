import React, { useEffect, useRef } from 'react';
import { SafeLayout } from '../components/SafeLayout';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Vibration,
} from 'react-native';
import { Sparkles, Plus, Cloud, ArrowRight } from '../components/Icons';
import { THEME } from '../theme';
import { useTheme } from '../theme/ThemeContext';
import { IMAGES, MY_WARDROBE } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { WardrobeCard } from '../components/WardrobeCard';
import { EditorialImage } from '../components/EditorialImage';
import AmbientBackground from '../components/AmbientBackground';

export const WardrobeScreen = ({ navigation }: any) => {
  const { colors, isDarkMode } = useTheme();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;
  const utilityWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: THEME.motion.durations.screen,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: THEME.motion.durations.screen,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate utility bar fill on mount
    setTimeout(() => {
      Animated.timing(utilityWidth, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false, // width animation
      }).start();
    }, 600);
  }, [fadeAnim, slideAnim, utilityWidth]);

  const handleGenerate = () => {
    Vibration.vibrate(10);
    navigation.navigate('Stylist');
  };

  const handleDigitize = () => {
    Vibration.vibrate(10);
    navigation.navigate('Scan');
  };

  const scrollAnimatedStyle = { opacity: fadeAnim, transform: [{ translateY: slideAnim }] };

  const safeLayoutStyle = [styles.container, styles.transparentBackground];
  const generateCardTheme = [styles.generateCard, { shadowColor: isDarkMode ? '#000000' : '#051F20' }];
  const generateOverlayTheme = isDarkMode ? styles.generateCardOverlayDark : styles.generateCardOverlayLight;
  const heroGreetingStyle = [styles.heroGreeting, { color: colors.darkText }];
  const sparkleTextStyle = [styles.sparkleText, { color: colors.primaryBurgundy }];
  const generateTitleStyle = [styles.generateTitle, { color: colors.darkText }];
  const generateSubStyle = [styles.generateSub, { color: colors.secondaryText }];
  const arrowIconStyle = [styles.arrowIcon, { backgroundColor: isDarkMode ? colors.cardBackground : 'rgba(255, 255, 255, 0.9)', borderColor: colors.border }];
  const statsCategoryStyle = [styles.statsCategory, { color: colors.darkText }];
  const statsTempStyle = [styles.statsTemp, { color: colors.primaryBurgundy }];
  const dividerStyle = [styles.divider, { backgroundColor: colors.border }];
  const utilityValStyle = [styles.utilityVal, { color: colors.primaryBurgundy }];
  const utilityTrackStyle = [styles.utilityTrack, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(22, 56, 50, 0.06)' }];
  const utilityBarAnimatedStyle = [styles.utilityBar, { width: utilityWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '72%'] }), backgroundColor: colors.primaryBurgundy }];

  return (
    <AmbientBackground>
      <SafeLayout
        statusBarMode={isDarkMode ? 'light-content' : 'dark-content'}
        style={safeLayoutStyle}
      >
        {/* Top Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.darkText }]}>Your Closet</Text>
          <Text style={[styles.subtitle, { color: colors.secondaryText }]}>DIGITAL ARCHIVE & COGNITIVE UTILITY</Text>
        </View>

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={scrollAnimatedStyle}
        >
          
          {/* Main: What Should I Wear Today Greeting & Generate card */}
          <View style={styles.heroSection}>
            <Text style={heroGreetingStyle}>What Should I Wear Today?</Text>
            
            <TouchableOpacity
              activeOpacity={0.94}
              onPress={handleGenerate}
              style={generateCardTheme}
            >
              <EditorialImage
                source={{ uri: IMAGES.abstractWardrobe }}
                style={styles.generateCardBg}
                containerStyle={StyleSheet.absoluteFill}
                enableOverlay={true}
              />
              <View style={generateOverlayTheme} />
              
              <GlassCard style={styles.generateInnerCard} opacity={isDarkMode ? 0.82 : 0.84}>
                <View style={styles.sparkleRow}>
                  <Sparkles size={14} color={colors.primaryBurgundy} fill={colors.primaryBurgundy} />
                  <Text style={sparkleTextStyle}>COGNITIVE SYNTHESIS</Text>
                </View>
                <Text style={generateTitleStyle}>Generate Look</Text>
                <Text style={generateSubStyle}>
                  AI will compose a styling recommendation from your current wardrobe archive.
                </Text>
                <View style={arrowIconStyle}>
                  <ArrowRight size={12} color={colors.primaryBurgundy} />
                </View>
              </GlassCard>
            </TouchableOpacity>
          </View>

          {/* Seasonal Stats Optimization Card */}
          <View style={styles.statsSection}>
            <GlassCard style={styles.statsCard} opacity={isDarkMode ? 0.85 : 0.88}>
              <View style={styles.statsHeader}>
                <View>
                  <Text style={statsCategoryStyle}>Autumn/Winter '24 Capsule</Text>
                  <Text style={statsTempStyle}>Bangalore • 24°C</Text>
                </View>
                <Cloud size={22} color={colors.primaryBurgundy} strokeWidth={1.5} />
              </View>
              <View style={dividerStyle} />
              <View style={styles.utilityContainer}>
                <View style={styles.utilityTextRow}>
                  <Text style={[styles.utilityLabel, { color: colors.secondaryText }]}>WARDROBE UTILITY</Text>
                  <Text style={utilityValStyle}>72% Optimized</Text>
                </View>
                <View style={utilityTrackStyle}>
                  <Animated.View style={utilityBarAnimatedStyle} />
                </View>
              </View>
            </GlassCard>
          </View>

          {/* Add item Quick capture deck */}
          <View style={styles.quickCaptureSection}>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleDigitize}
              style={[
                styles.captureCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                  shadowColor: isDarkMode ? '#000000' : '#051F20',
                }
              ]}
            >
              <View style={[styles.captureIconCircle, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(22, 56, 50, 0.05)', borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(22, 56, 50, 0.12)' }]}>
                <Plus size={18} color={colors.primaryBurgundy} />
              </View>
              <View style={styles.captureTextMeta}>
                <Text style={[styles.captureTitle, { color: colors.darkText }]}>Digitize New Item</Text>
                <Text style={[styles.captureSub, { color: colors.secondaryText }]}>Upload photography or scan textile characteristics directly</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Digital Wardrobe Archives Grid */}
          <View style={styles.archiveHeader}>
            <Text style={[styles.archiveTitle, { color: colors.darkText }]}>Wardrobe Archive</Text>
            <Text style={[styles.archiveCount, { color: colors.primaryBurgundy }]}>{MY_WARDROBE.length} PIECES</Text>
          </View>

          <View style={styles.gridContainer}>
            {MY_WARDROBE.map((item) => (
              <WardrobeCard
                key={item.id}
                image={item.image}
                title={item.title}
                category={item.category}
                lastWorn={item.lastWorn}
                wearCount={item.wearCount}
              />
            ))}
          </View>

        </Animated.ScrollView>
      </SafeLayout>
    </AmbientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 6,
  },
  title: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontFamily: THEME.typography.headingLight.fontFamily,
    fontSize: 8,
    letterSpacing: 1.5,
    marginTop: 2,
    fontWeight: '600',
  },
  heroSection: {
    paddingHorizontal: 18,
    marginTop: 28,
  },
  heroGreeting: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 20,
    marginBottom: 18,
    fontWeight: '700',
  },
  generateCard: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'flex-end',
    ...THEME.shadows.premiumDeep,
  },
  generateCardBg: {
    width: '100%',
    height: '100%',
  },
  generateCardOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(5, 31, 32, 0.32)',
  },
  generateInnerCard: {
    margin: 18,
    padding: 18,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  sparkleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sparkleText: {
    fontFamily: THEME.typography.uppercase.fontFamily,
    fontSize: 8,
    letterSpacing: 1.5,
    marginLeft: 6,
    fontWeight: '700',
  },
  generateTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 18,
    marginBottom: 2,
    fontWeight: '700',
  },
  generateSub: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 11,
    lineHeight: 15,
  },
  arrowIcon: {
    position: 'absolute',
    bottom: 18,
    right: 18,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  statsSection: {
    paddingHorizontal: 18,
    marginTop: 28,
  },
  statsCard: {
    padding: 22,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsCategory: {
    fontFamily: THEME.typography.headingLight.fontFamily,
    fontSize: 12,
    letterSpacing: 0.5,
    fontWeight: '700',
  },
  statsTemp: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 16,
    marginTop: 2,
    fontWeight: '700',
  },
  divider: {
    height: 0.5,
    marginVertical: 18,
    opacity: 0.4,
  },
  utilityContainer: {
    width: '100%',
  },
  utilityTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs,
  },
  utilityLabel: {
    fontFamily: THEME.typography.uppercase.fontFamily,
    fontSize: 8.5,
    letterSpacing: 1.5,
    fontWeight: '700',
  },
  utilityVal: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 10.5,
    fontWeight: '700',
  },
  utilityTrack: {
    width: '100%',
    height: 5,
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  utilityBar: {
    height: '100%',
    borderRadius: 2.5,
  },
  quickCaptureSection: {
    paddingHorizontal: 18,
    marginTop: 28,
  },
  captureCard: {
    height: 68,
    borderRadius: 16,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    ...THEME.shadows.premium,
  },
  captureIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
    borderWidth: 0.5,
  },
  captureTextMeta: {
    flex: 1,
  },
  captureTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 14.5,
    fontWeight: '700',
  },
  captureSub: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 9.5,
    marginTop: 1,
  },
  archiveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 18,
    marginTop: 36,
    marginBottom: 18,
  },
  archiveTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 18,
    fontWeight: '700',
  },
  archiveCount: {
    fontFamily: THEME.typography.uppercase.fontFamily,
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '700',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
});
