import React, { useEffect, useRef } from 'react';
import { SafeLayout } from '../components/SafeLayout';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
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
  }, []);

  const handleGenerate = () => {
    Vibration.vibrate(10);
    navigation.navigate('Stylist');
  };

  const handleDigitize = () => {
    Vibration.vibrate(10);
    navigation.navigate('Scan');
  };

  return (
    <AmbientBackground>
      <SafeLayout
        statusBarMode={isDarkMode ? 'light-content' : 'dark-content'}
        style={[styles.container, { backgroundColor: 'transparent' }]}
      >
        {/* Top Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.darkText }]}>Your Closet</Text>
          <Text style={[styles.subtitle, { color: colors.secondaryText }]}>DIGITAL ARCHIVE & COGNITIVE UTILITY</Text>
        </View>

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          
          {/* Main: What Should I Wear Today Greeting & Generate card */}
          <View style={styles.heroSection}>
            <Text style={[styles.heroGreeting, { color: colors.darkText }]}>What Should I Wear Today?</Text>
            
            <TouchableOpacity
              activeOpacity={0.94}
              onPress={handleGenerate}
              style={[styles.generateCard, { shadowColor: isDarkMode ? '#000000' : '#051F20' }]}
            >
              <EditorialImage
                source={{ uri: IMAGES.abstractWardrobe }}
                style={styles.generateCardBg}
                containerStyle={StyleSheet.absoluteFill}
                enableOverlay={true}
              />
              <View style={[styles.generateCardOverlay, isDarkMode && { backgroundColor: 'rgba(10, 6, 6, 0.45)' }]} />
              
              <GlassCard style={styles.generateInnerCard} opacity={isDarkMode ? 0.82 : 0.84}>
                <View style={styles.sparkleRow}>
                  <Sparkles size={14} color={colors.primaryBurgundy} fill={colors.primaryBurgundy} />
                  <Text style={[styles.sparkleText, { color: colors.primaryBurgundy }]}>COGNITIVE SYNTHESIS</Text>
                </View>
                <Text style={[styles.generateTitle, { color: colors.darkText }]}>Generate Look</Text>
                <Text style={[styles.generateSub, { color: colors.secondaryText }]}>
                  AI will compose a styling recommendation from your current wardrobe archive.
                </Text>
                <View style={[styles.arrowIcon, { backgroundColor: isDarkMode ? colors.cardBackground : 'rgba(255, 255, 255, 0.9)', borderColor: colors.border }]}>
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
                  <Text style={[styles.statsCategory, { color: colors.darkText }]}>Autumn/Winter '24 Capsule</Text>
                  <Text style={[styles.statsTemp, { color: colors.primaryBurgundy }]}>Bangalore • 24°C</Text>
                </View>
                <Cloud size={22} color={colors.primaryBurgundy} strokeWidth={1.5} />
              </View>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <View style={styles.utilityContainer}>
                <View style={styles.utilityTextRow}>
                  <Text style={[styles.utilityLabel, { color: colors.secondaryText }]}>WARDROBE UTILITY</Text>
                  <Text style={[styles.utilityVal, { color: colors.primaryBurgundy }]}>72% Optimized</Text>
                </View>
                <View style={[styles.utilityTrack, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(22, 56, 50, 0.06)' }]}>
                  <Animated.View style={[
                    styles.utilityBar,
                    { 
                      width: utilityWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '72%'] }),
                      backgroundColor: colors.primaryBurgundy,
                    }
                  ]} />
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
    fontFamily: 'Georgia',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontFamily: 'Georgia',
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
    fontFamily: 'Georgia',
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
    fontFamily: 'Georgia',
    fontSize: 8,
    letterSpacing: 1.5,
    marginLeft: 6,
    fontWeight: '700',
  },
  generateTitle: {
    fontFamily: 'Georgia',
    fontSize: 18,
    marginBottom: 2,
    fontWeight: '700',
  },
  generateSub: {
    fontFamily: 'Georgia',
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
    fontFamily: 'Georgia',
    fontSize: 12,
    letterSpacing: 0.5,
    fontWeight: '700',
  },
  statsTemp: {
    fontFamily: 'Georgia',
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
    fontFamily: 'Georgia',
    fontSize: 8.5,
    letterSpacing: 1.5,
    fontWeight: '700',
  },
  utilityVal: {
    fontFamily: 'Georgia',
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
    fontFamily: 'Georgia',
    fontSize: 14.5,
    fontWeight: '700',
  },
  captureSub: {
    fontFamily: 'Georgia',
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
    fontFamily: 'Georgia',
    fontSize: 18,
    fontWeight: '700',
  },
  archiveCount: {
    fontFamily: 'Georgia',
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
