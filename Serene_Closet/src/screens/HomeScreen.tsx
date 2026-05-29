import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Vibration,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Menu } from '../components/Icons';
import { THEME } from '../theme';
import { useTheme } from '../theme/ThemeContext';
import { IMAGES, TRENDING_PRODUCTS } from '../utils/mockData';
import { SearchBar } from '../components/SearchBar';
import { WeatherCard } from '../components/WeatherCard';
import { FashionCard } from '../components/FashionCard';
import { AIRecommendationCard } from '../components/AIRecommendationCard';
import { SafeLayout } from '../components/SafeLayout';
import { EditorialImage } from '../components/EditorialImage';
import AmbientBackground from '../components/AmbientBackground';

type HomeScreenProps = {
  navigation: any;
};

export const HomeScreen = ({ navigation }: HomeScreenProps): React.JSX.Element => {
  const insets = useSafeAreaInsets();
  const { colors, isDarkMode } = useTheme();
  
  // Fade-up reveals on mount
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;

  const sectionFade1 = useRef(new Animated.Value(0)).current;
  const sectionFade2 = useRef(new Animated.Value(0)).current;
  const sectionFade3 = useRef(new Animated.Value(0)).current;
  const sectionSlide1 = useRef(new Animated.Value(20)).current;
  const sectionSlide2 = useRef(new Animated.Value(20)).current;
  const sectionSlide3 = useRef(new Animated.Value(20)).current;

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

    // Staggered section reveals
    const staggerDelay = THEME.motion.stagger.sectionDelay;
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(sectionFade1, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(sectionSlide1, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]).start();
    }, staggerDelay);

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(sectionFade2, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(sectionSlide2, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]).start();
    }, staggerDelay * 2);

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(sectionFade3, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(sectionSlide3, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]).start();
    }, staggerDelay * 3);
  }, []);

  const handleAvatarPress = () => {
    Vibration.vibrate(8);
    navigation.navigate('Profile');
  };

  return (
    <AmbientBackground>
      <SafeLayout
        statusBarMode={isDarkMode ? 'light-content' : 'dark-content'}
        style={[styles.container, { backgroundColor: 'transparent' }]}
      >
        {/* Top Navbar */}
        <View style={[styles.navbar, { backgroundColor: 'transparent', borderColor: colors.borderLight }]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Vibration.vibrate(5)}
            style={styles.navIcon}
          >
            <Menu size={20} color={colors.darkText} strokeWidth={1.5} />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Text style={[styles.logoText, { color: colors.darkText }]}>SERENE</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleAvatarPress}
            style={[styles.avatarWrapper, { borderColor: colors.border }]}
          >
            <EditorialImage
              source={{ uri: IMAGES.avatar }}
              style={styles.avatar}
              containerStyle={styles.avatarContainer}
              enableOverlay={true}
            />
          </TouchableOpacity>
        </View>

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Editorial Greeting */}
          <Animated.View style={{ opacity: sectionFade1, transform: [{ translateY: sectionSlide1 }] }}>
            <View style={styles.greetingContainer}>
              <Text style={[styles.greetingSub, { color: colors.primaryBurgundy }]}>WELCOME TO SERENE</Text>
              <Text style={[styles.greetingMain, { color: colors.darkText }]}>Good morning, Sarswati.</Text>
              <View style={[styles.editorialLine, { backgroundColor: colors.primaryBurgundy }]} />
            </View>
          </Animated.View>

          {/* Search Bar */}
          <View style={styles.searchWrapper}>
            <SearchBar
              placeholder="Search collections, fabrics, styles..."
              onFilterPress={() => {
                Vibration.vibrate(8);
                navigation.navigate('Explore');
              }}
            />
          </View>

          {/* Weather Card Contextual Suggestion */}
          <Animated.View style={{ opacity: sectionFade2, transform: [{ translateY: sectionSlide2 }] }}>
            <WeatherCard
              location="Bangalore"
              temperature="24°C"
              condition="Breezy & Mild"
              recommendation="Perfect for a layered look. Pair the Double-Breasted Wool Trench over a silk draped top with tailored wool trousers."
              onActionPress={() => navigation.navigate('Stylist')}
            />
          </Animated.View>

          {/* Trending Section */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTitle, { color: colors.darkText }]}>Trending Now</Text>
              <Text style={[styles.sectionSubtitle, { color: colors.secondaryText }]}>CURATED AUTUMN EDITORIALS</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                Vibration.vibrate(8);
                navigation.navigate('Explore');
              }}
            >
              <Text style={[styles.viewAllBtn, { color: colors.primaryBurgundy }]}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
            scrollEventThrottle={16}
          >
            {TRENDING_PRODUCTS.map((prod) => (
              <FashionCard
                key={prod.id}
                image={prod.image}
                title={prod.title}
                category={prod.category}
                onPress={() => navigation.navigate('Explore')}
              />
            ))}
          </ScrollView>

          {/* AI Stylist Picks Section */}
          <Animated.View style={{ opacity: sectionFade3, transform: [{ translateY: sectionSlide3 }] }}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={[styles.sectionTitle, { color: colors.darkText }]}>AI Stylist Picks</Text>
                <Text style={[styles.sectionSubtitle, { color: colors.secondaryText }]}>GENERATED FOR YOUR ARCHIVE</Text>
              </View>
            </View>

            <AIRecommendationCard
              title="Minimalist Chic Look"
              subtitle="96% match for your style signature today"
              image="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800"
              onPress={() => navigation.navigate('Stylist')}
              style={styles.heroCard}
            />
          </Animated.View>
        </Animated.ScrollView>
      </SafeLayout>
    </AmbientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    borderBottomWidth: 0.5,
  },
  navIcon: {
    padding: 6,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Georgia',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 6,
  },
  avatarWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  avatarContainer: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingBottom: 110,
  },
  greetingContainer: {
    paddingHorizontal: 18,
    paddingTop: 28,
    paddingBottom: 10,
  },
  greetingSub: {
    fontFamily: 'Georgia',
    fontSize: 8.5,
    letterSpacing: 2,
    marginBottom: 4,
    fontWeight: '600',
  },
  greetingMain: {
    fontFamily: 'Georgia',
    fontSize: 24,
    fontWeight: '700',
  },
  searchWrapper: {
    paddingHorizontal: 18,
    marginVertical: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 18,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: 'Georgia',
    fontSize: 18,
    fontWeight: '700',
  },
  sectionSubtitle: {
    fontFamily: 'Georgia',
    fontSize: 7.5,
    letterSpacing: 1.5,
    marginTop: 2,
    fontWeight: '600',
  },
  viewAllBtn: {
    fontFamily: 'Georgia',
    fontSize: 10.5,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  horizontalScroll: {
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 18,
  },
  heroCard: {
    marginHorizontal: 18,
  },
  editorialLine: {
    width: 32,
    height: 1,
    marginTop: 10,
    opacity: 0.4,
  },
});
