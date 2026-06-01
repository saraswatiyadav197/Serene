import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Vibration } from 'react-native';
import { SafeLayout } from '../components/SafeLayout';
import { EditorialHeader } from '../components/EditorialHeader';
import { GlassCard } from '../components/GlassCard';
import { Heart, Sparkles, ShoppingBag } from '../components/Icons';
import { THEME } from '../theme';
import { EXPLORE_PRODUCTS } from '../utils/mockData';
import { EditorialImage } from '../components/EditorialImage';

const { width } = Dimensions.get('window');

export const ProductDetailScreen = ({ route, navigation }: any) => {
  const { productId } = route.params || { productId: 'e1' };
  const product = EXPLORE_PRODUCTS.find((p) => p.id === productId) || EXPLORE_PRODUCTS[0];

  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  // Complete the look items (mocked matching items)
  const completeLookItems = EXPLORE_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleLike = () => {
    Vibration.vibrate(10);
    setIsLiked(!isLiked);
  };

  const handleSelectSize = (size: string) => {
    Vibration.vibrate(6);
    setSelectedSize(size);
  };

  return (
    <SafeLayout statusBarMode="dark-content" style={styles.container}>
      <EditorialHeader
        title="Editorial Piece"
        subtitle="Atelier Archive Selection"
        onBackPress={() => {
          Vibration.vibrate(8);
          navigation.goBack();
        }}
        rightComponent={
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleLike}
            style={styles.headerLikeButton}
          >
            <Heart
              size={15}
              color={isLiked ? THEME.colors.primaryBurgundy : THEME.colors.darkText}
              fill={isLiked ? THEME.colors.primaryBurgundy : 'transparent'}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Fullscreen Hero Image Section */}
        <View style={styles.imageContainer}>
          <EditorialImage
            source={{ uri: product.image }}
            style={styles.image}
            containerStyle={StyleSheet.absoluteFill}
            enableOverlay={true}
          />
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>{product.price}</Text>
          </View>
        </View>

        {/* Title, Category & Brand Details */}
        <View style={styles.metaContainer}>
          <Text style={styles.categoryText}>{product.category.toUpperCase()}</Text>
          <Text style={styles.titleText}>{product.title}</Text>
          <Text style={styles.brandText}>SERENE ATELIER</Text>
        </View>

        {/* Size Selection Deck */}
        <View style={styles.sizeSection}>
          <Text style={styles.sectionLabel}>SELECT SIZE</Text>
          <View style={styles.sizeRow}>
            {sizes.map((s) => (
              <TouchableOpacity
                key={s}
                activeOpacity={0.8}
                onPress={() => handleSelectSize(s)}
                style={[
                  styles.sizeChip,
                  selectedSize === s && styles.sizeChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === s && styles.sizeTextActive,
                  ]}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* AI Concierge Styling Insight Box */}
        <View style={styles.aiSection}>
          <GlassCard style={styles.aiCard} opacity={0.92}>
            <View style={styles.aiHeader}>
              <Sparkles size={14} color={THEME.colors.primaryBurgundy} fill={THEME.colors.primaryBurgundy} />
              <Text style={styles.aiHeaderTitle}>HOW TO STYLE THIS PIECE</Text>
            </View>
            <Text style={styles.aiAdviceText}>
              "Perfect for a commanding boardroom look or refined high-tea soiree. We suggest pairing this with high-waisted Pleated Wool Trousers in Sand Beige, complemented by a tailored cream silk drape shirt and gold-toned minimal chains."
            </Text>
          </GlassCard>
        </View>

        {/* Detailed Fabric & Eco Breakdown */}
        <View style={styles.detailSection}>
          <Text style={styles.sectionLabel}>MATERIAL & ORIGIN</Text>
          <Text style={styles.descriptionText}>
            {product.description || '100% fine organic weave blend, curated under premium strict atelier control.'}
          </Text>
          <View style={styles.specGrid}>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>COMPOSITION</Text>
              <Text style={styles.specValue}>60% Mulberry Silk, 40% Fine Cashmere</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>ECO SCALE</Text>
              <Text style={styles.specValue}>Class A • Biodegradable Fiber</Text>
            </View>
          </View>
        </View>

        {/* Complete the look carousel */}
        <View style={styles.lookSection}>
          <Text style={styles.sectionLabel}>COMPLETE THE LOOK</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.lookScroll}
          >
            {completeLookItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.9}
                onPress={() => {
                  Vibration.vibrate(8);
                  navigation.push('ProductDetail', { productId: item.id });
                }}
                style={styles.lookCard}
              >
                <View style={styles.lookImageContainer}>
                  <EditorialImage
                    source={{ uri: item.image }}
                    style={styles.lookImage}
                    containerStyle={StyleSheet.absoluteFill}
                    enableOverlay={true}
                  />
                </View>
                <View style={styles.lookMeta}>
                  <Text style={styles.lookTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.lookPrice}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Floating Add to Archive Action Bar */}
      <View style={styles.actionSticky}>
        <GlassCard style={styles.actionCard} opacity={0.96}>
          <View style={styles.actionInfo}>
            <Text style={styles.stickyPriceLabel}>TOTAL PRICE</Text>
            <Text style={styles.stickyPriceVal}>{product.price}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => {
              Vibration.vibrate([0, 15, 20]);
              navigation.navigate('Checkout', { productId: product.id });
            }}
            style={styles.stickyBtn}
          >
            <ShoppingBag size={14} color={THEME.colors.cardBackground} style={styles.iconMarginSmall} />
            <Text style={styles.stickyBtnText}>SECURE ORDER</Text>
          </TouchableOpacity>
        </GlassCard>
      </View>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.softBeigeBackground,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  headerLikeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 0.5,
    borderColor: THEME.colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconMarginSmall: {
    marginRight: 6,
  },
  imageContainer: {
    width: width - 32,
    height: width * 1.25,
    marginHorizontal: THEME.spacing.md,
    borderRadius: THEME.borderRadius.card,
    overflow: 'hidden',
    position: 'relative',
    ...THEME.shadows.premiumDeep,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  priceTag: {
    position: 'absolute',
    bottom: THEME.spacing.md,
    right: THEME.spacing.md,
    backgroundColor: THEME.colors.primaryBurgundy,
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.xs + 2,
    borderRadius: THEME.borderRadius.pill,
    ...THEME.shadows.premium,
  },
  priceText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 12.5,
    color: THEME.colors.cardBackground,
    letterSpacing: 0.5,
  },
  metaContainer: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.lg,
  },
  categoryText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8.5,
    letterSpacing: 2,
    color: THEME.colors.primaryBurgundy,
    marginBottom: 4,
  },
  titleText: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 24,
    color: THEME.colors.darkText,
    lineHeight: 30,
  },
  brandText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 7.5,
    letterSpacing: 1,
    color: THEME.colors.secondaryText,
    marginTop: 4,
  },
  sizeSection: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.lg,
  },
  sectionLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8.5,
    letterSpacing: 2,
    color: THEME.colors.secondaryText,
    marginBottom: THEME.spacing.sm,
  },
  sizeRow: {
    flexDirection: 'row',
  },
  sizeChip: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 0.5,
    borderColor: THEME.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.sm,
    backgroundColor: THEME.colors.cardBackground,
  },
  sizeChipActive: {
    backgroundColor: THEME.colors.primaryBurgundy,
    borderColor: THEME.colors.primaryBurgundy,
  },
  sizeText: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12,
    color: THEME.colors.secondaryText,
  },
  sizeTextActive: {
    color: THEME.colors.cardBackground,
    fontFamily: THEME.typography.bodyBold.fontFamily,
  },
  aiSection: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.lg + 4,
  },
  aiCard: {
    padding: THEME.spacing.md,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs + 2,
  },
  aiHeaderTitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8.5,
    letterSpacing: 1.5,
    color: THEME.colors.primaryBurgundy,
    marginLeft: 6,
  },
  aiAdviceText: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12,
    color: THEME.colors.darkText,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  detailSection: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.lg + 4,
  },
  descriptionText: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12.5,
    color: THEME.colors.secondaryText,
    lineHeight: 18,
  },
  specGrid: {
    marginTop: THEME.spacing.md,
    borderTopWidth: 0.5,
    borderTopColor: THEME.colors.borderLight,
    paddingTop: THEME.spacing.md,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: THEME.spacing.xs + 2,
  },
  specLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8.5,
    letterSpacing: 1,
    color: THEME.colors.secondaryText,
  },
  specValue: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 11.5,
    color: THEME.colors.darkText,
  },
  lookSection: {
    marginTop: THEME.spacing.lg + 4,
    paddingBottom: 24,
  },
  lookScroll: {
    paddingLeft: THEME.spacing.md,
    paddingRight: THEME.spacing.sm,
  },
  lookCard: {
    width: 140,
    marginRight: THEME.spacing.md,
    backgroundColor: THEME.colors.cardBackground,
    borderRadius: THEME.borderRadius.card,
    borderWidth: 0.5,
    borderColor: THEME.colors.border,
    padding: THEME.spacing.sm,
    ...THEME.shadows.premium,
  },
  lookImageContainer: {
    width: '100%',
    height: 140,
    borderRadius: THEME.borderRadius.card - 6,
    overflow: 'hidden',
    position: 'relative',
  },
  lookImage: {
    width: '100%',
    height: '100%',
  },
  lookMeta: {
    marginTop: THEME.spacing.sm,
  },
  lookTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 12,
    color: THEME.colors.darkText,
  },
  lookPrice: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9.5,
    color: THEME.colors.primaryBurgundy,
    marginTop: 2,
  },
  actionSticky: {
    position: 'absolute',
    bottom: 22,
    left: THEME.spacing.md,
    right: THEME.spacing.md,
    zIndex: 100,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    borderRadius: THEME.borderRadius.pill,
    paddingHorizontal: THEME.spacing.md + 4,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    ...THEME.shadows.premiumDeep,
  },
  actionInfo: {
    justifyContent: 'center',
  },
  stickyPriceLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    color: THEME.colors.secondaryText,
    letterSpacing: 1.5,
  },
  stickyPriceVal: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 17,
    color: THEME.colors.primaryBurgundy,
  },
  stickyBtn: {
    backgroundColor: THEME.colors.primaryBurgundy,
    height: 42,
    borderRadius: 21,
    paddingHorizontal: THEME.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...THEME.shadows.premium,
  },
  stickyBtnText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9.5,
    color: THEME.colors.cardBackground,
    letterSpacing: 1.5,
  },
});
