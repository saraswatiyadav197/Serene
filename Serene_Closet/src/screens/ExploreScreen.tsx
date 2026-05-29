import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Vibration,
} from 'react-native';
import { THEME } from '../theme';
import { useTheme } from '../theme/ThemeContext';
import { EXPLORE_PRODUCTS } from '../utils/mockData';
import { SearchBar } from '../components/SearchBar';
import { CategoryChip } from '../components/CategoryChip';
import { AnimatedProductCard } from '../components/AnimatedProductCard';
import { SafeLayout } from '../components/SafeLayout';
import { EditorialImage } from '../components/EditorialImage';
import { Sparkles, ArrowRight } from '../components/Icons';
import { GlassCard } from '../components/GlassCard';
import AmbientBackground from '../components/AmbientBackground';

const { width } = Dimensions.get('window');
const CATEGORIES = ['All', 'Women', 'Men', 'Luxury'];

const PARIS_CAPSULE = [
  {
    id: 'pc1',
    title: 'Double-Breasted Wool Trench',
    price: '$1,290',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600',
  },
  {
    id: 'pc2',
    title: 'Pleated Wool Trousers',
    price: '$580',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600',
  },
];

export const ExploreScreen = ({ navigation }: any): React.JSX.Element => {
  const { colors, isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;

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
  }, [selectedCategory]);

  const filteredProducts = EXPLORE_PRODUCTS.filter((prod) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      prod.category.toLowerCase() === selectedCategory.toLowerCase() ||
      (selectedCategory === 'Luxury' && parseInt(prod.price.replace('$', '').replace(',', ''), 10) > 600);
    const matchesSearch = prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProduct = filteredProducts[0];
  const catalogList = filteredProducts.slice(1);
  const staggeredLeft = catalogList.filter((_, i) => i % 2 === 0);
  const staggeredRight = catalogList.filter((_, i) => i % 2 !== 0);

  const handleProductPress = (id: string) => {
    Vibration.vibrate(8);
    navigation.navigate('ProductDetail', { productId: id });
  };

  return (
    <AmbientBackground>
      <SafeLayout
        statusBarMode={isDarkMode ? 'light-content' : 'dark-content'}
        style={[styles.container, { backgroundColor: 'transparent' }]}
      >
        {/* Header section */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.darkText }]}>Explore</Text>
          <Text style={[styles.subtitle, { color: colors.secondaryText }]}>EXCLUSIVE COLLECTIONS & ATELIERS</Text>
        </View>

        {/* Search Input */}
        <View style={styles.searchWrapper}>
          <SearchBar
            placeholder="Search collections..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Categories Chips (Horizontal) */}
        <View style={styles.chipContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipScroll}
            scrollEventThrottle={16}
          >
            {CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat}
                label={cat}
                isActive={selectedCategory === cat}
                onPress={() => {
                  Vibration.vibrate(6);
                  setSelectedCategory(cat);
                }}
              />
            ))}
          </ScrollView>
        </View>

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Editorial Storytelling: Paris Capsule */}
          {selectedCategory === 'All' && searchQuery === '' && (
            <View style={styles.capsuleSection}>
              <View style={styles.capsuleHeader}>
                <Text style={[styles.capsuleTitle, { color: colors.darkText }]}>Paris Capsule</Text>
                <Text style={[styles.capsuleSub, { color: colors.secondaryText }]}>LIMITED SEASONAL CAMPAIGN</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.capsuleScroll}
              >
                {PARIS_CAPSULE.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.94}
                    onPress={() => handleProductPress('e1')}
                    style={styles.capsuleCard}
                  >
                    <View style={styles.capsuleImageWrapper}>
                      <EditorialImage
                        source={{ uri: item.image }}
                        style={styles.capsuleImage}
                        containerStyle={StyleSheet.absoluteFill}
                        enableOverlay={true}
                      />
                    </View>
                    <Text style={[styles.capsuleCardTitle, { color: colors.darkText }]}>{item.title}</Text>
                    <Text style={[styles.capsuleCardPrice, { color: colors.primaryBurgundy }]}>{item.price}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Featured Campaign Piece (Oversized Hero) */}
          {featuredProduct && (
            <View style={styles.featuredSection}>
              <Text style={[styles.sectionHeading, { color: colors.secondaryText }]}>FEATURED CAMPAIGN PIECE</Text>
              <TouchableOpacity
                activeOpacity={0.96}
                onPress={() => handleProductPress(featuredProduct.id)}
                style={[
                  styles.featuredCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                    shadowColor: isDarkMode ? '#000000' : '#051F20',
                  }
                ]}
              >
                <View style={styles.featuredImageContainer}>
                  <EditorialImage
                    source={{ uri: featuredProduct.image }}
                    style={styles.featuredImage}
                    containerStyle={StyleSheet.absoluteFill}
                    enableOverlay={true}
                  />
                  <View style={[styles.featuredOverlay, isDarkMode && { backgroundColor: 'rgba(10, 6, 6, 0.3)' }]} />
                  <GlassCard style={styles.featuredMeta} opacity={isDarkMode ? 0.82 : 0.88}>
                    <View style={styles.featuredBadge}>
                      <Sparkles size={11} color={colors.primaryBurgundy} fill={colors.primaryBurgundy} />
                      <Text style={[styles.featuredBadgeText, { color: colors.primaryBurgundy }]}>SEASON HEIRLOOM</Text>
                    </View>
                    <Text style={[styles.featuredTitle, { color: colors.darkText }]}>{featuredProduct.title}</Text>
                    <Text style={[styles.featuredPrice, { color: colors.primaryBurgundy }]}>{featuredProduct.price}</Text>
                    <View style={styles.featuredAction}>
                      <Text style={[styles.featuredActionText, { color: colors.primaryBurgundy }]}>EXPLORE PIECE</Text>
                      <ArrowRight size={12} color={colors.primaryBurgundy} />
                    </View>
                  </GlassCard>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Catalog Staggered Asymmetric Grid */}
          {filteredProducts.length > 1 ? (
            <View style={styles.gridSection}>
              <Text style={[styles.sectionHeading, { color: colors.secondaryText }]}>THE ATELIER COLLECTION</Text>
              
              <View style={styles.staggeredGrid}>
                {/* Left Column */}
                <View style={styles.staggeredColumn}>
                  {staggeredLeft.map((item, idx) => (
                    <View key={item.id} style={styles.staggeredItemWrapper}>
                      <AnimatedProductCard
                        id={item.id}
                        image={item.image}
                        title={item.title}
                        category={item.category}
                        price={item.price}
                        index={idx}
                        onPress={() => handleProductPress(item.id)}
                      />
                    </View>
                  ))}
                </View>

                {/* Right Column (Offset downwards to create staggered layout) */}
                <View style={[styles.staggeredColumn, { marginTop: 32 }]}>
                  {staggeredRight.map((item, idx) => (
                    <View key={item.id} style={styles.staggeredItemWrapper}>
                      <AnimatedProductCard
                        id={item.id}
                        image={item.image}
                        title={item.title}
                        category={item.category}
                        price={item.price}
                        index={idx}
                        onPress={() => handleProductPress(item.id)}
                      />
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ) : filteredProducts.length === 1 ? (
            null
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.secondaryText }]}>No items found in this category.</Text>
            </View>
          )}
        </Animated.ScrollView>
      </SafeLayout>
    </AmbientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  searchWrapper: {
    paddingHorizontal: 18,
    marginVertical: 10,
  },
  chipContainer: {
    height: 48,
    marginBottom: 6,
  },
  chipScroll: {
    paddingLeft: 18,
    paddingRight: 10,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  capsuleSection: {
    marginTop: 10,
    marginBottom: 28,
  },
  capsuleHeader: {
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  capsuleTitle: {
    fontFamily: 'Georgia',
    fontSize: 18,
    fontWeight: '700',
  },
  capsuleSub: {
    fontFamily: 'Georgia',
    fontSize: 7.5,
    letterSpacing: 1.5,
    marginTop: 2,
    fontWeight: '600',
  },
  capsuleScroll: {
    paddingLeft: 18,
  },
  capsuleCard: {
    width: 220,
    marginRight: 18,
  },
  capsuleImageWrapper: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 10,
  },
  capsuleImage: {
    width: '100%',
    height: '100%',
  },
  capsuleCardTitle: {
    fontFamily: 'Georgia',
    fontSize: 14,
    marginBottom: 2,
    fontWeight: '700',
  },
  capsuleCardPrice: {
    fontFamily: 'Georgia',
    fontSize: 11,
    fontWeight: '600',
  },
  featuredSection: {
    marginHorizontal: 18,
    marginBottom: 36,
  },
  sectionHeading: {
    fontFamily: 'Georgia',
    fontSize: 8.5,
    letterSpacing: 1.8,
    marginBottom: 10,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  featuredCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 0.5,
    ...THEME.shadows.premiumDeep,
  },
  featuredImageContainer: {
    width: '100%',
    height: 380,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(5, 31, 32, 0.2)',
  },
  featuredMeta: {
    margin: 18,
    padding: 18,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  featuredBadgeText: {
    fontFamily: 'Georgia',
    fontSize: 8,
    letterSpacing: 1.5,
    marginLeft: 6,
    fontWeight: '700',
  },
  featuredTitle: {
    fontFamily: 'Georgia',
    fontSize: 18,
    marginBottom: 2,
    fontWeight: '700',
  },
  featuredPrice: {
    fontFamily: 'Georgia',
    fontSize: 12,
    marginBottom: 6,
    fontWeight: '600',
  },
  featuredAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredActionText: {
    fontFamily: 'Georgia',
    fontSize: 9.5,
    letterSpacing: 1,
    marginRight: 6,
    fontWeight: '700',
  },
  gridSection: {
    marginHorizontal: 18,
  },
  staggeredGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  staggeredColumn: {
    width: (width - 48) / 2,
  },
  staggeredItemWrapper: {
    marginBottom: 18,
  },
  emptyContainer: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Georgia',
    fontSize: 12.5,
  },
});
