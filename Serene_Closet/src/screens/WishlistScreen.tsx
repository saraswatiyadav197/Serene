import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeLayout } from '../components/SafeLayout';
import { EditorialHeader } from '../components/EditorialHeader';
import { AnimatedProductCard } from '../components/AnimatedProductCard';
import { GlassCard } from '../components/GlassCard';
import { THEME } from '../theme';
import { EXPLORE_PRODUCTS } from '../utils/mockData';
import { Sparkles, Plus } from '../components/Icons';

export const WishlistScreen = ({ navigation }: any) => {
  // Curated collections boards mock
  const collections = [
    { title: 'Boardroom Chic', count: 4, match: '98%' },
    { title: 'Soiree Capsule', count: 2, match: '94%' },
    { title: 'Autumn Comforts', count: 3, match: '96%' }
  ];

  // We will display all explore products as saved wishlisted items for mock presentation
  const savedItems = EXPLORE_PRODUCTS.slice(0, 4);

  return (
    <SafeLayout statusBarMode="dark-content" style={styles.container}>
      <EditorialHeader
        title="Your Curations"
        subtitle="Saved Aesthetics & Chapters"
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Curated Collection Boards Carousel */}
        <View style={styles.collectionsSection}>
          <Text style={styles.sectionLabel}>AI-ASSISTED CAPSULES</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.collectionsScroll}
          >
            {/* Create Collection Card */}
            <TouchableOpacity activeOpacity={0.8} style={styles.createCard}>
              <View style={styles.plusCircle}>
                <Plus size={16} color={THEME.colors.primaryBurgundy} />
              </View>
              <Text style={styles.createCardText}>New Capsule</Text>
            </TouchableOpacity>

            {collections.map((col) => (
              <GlassCard key={col.title} style={styles.colCard} opacity={0.92}>
                <View style={styles.cardHeader}>
                  <Sparkles size={11} color={THEME.colors.primaryBurgundy} fill={THEME.colors.primaryBurgundy} />
                  <Text style={styles.matchScore}>{col.match} FIT</Text>
                </View>
                <Text style={styles.colTitle}>{col.title}</Text>
                <Text style={styles.colCount}>{col.count} SELECTED PIECES</Text>
              </GlassCard>
            ))}
          </ScrollView>
        </View>

        {/* Curated grid listing */}
        <View style={styles.gridSection}>
          <Text style={styles.sectionLabel}>SAVED WARDROBE ATELIER ITEMS</Text>
          <View style={styles.grid}>
            {savedItems.map((item, idx) => (
              <AnimatedProductCard
                key={item.id}
                id={item.id}
                title={item.title}
                category={item.category}
                price={item.price}
                image={item.image}
                index={idx}
                onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
              />
            ))}
          </View>
        </View>
      </ScrollView>
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
  collectionsSection: {
    marginTop: THEME.spacing.sm,
  },
  sectionLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 2,
    color: THEME.colors.secondaryText,
    marginBottom: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.md,
  },
  collectionsScroll: {
    paddingLeft: THEME.spacing.md,
    paddingRight: THEME.spacing.sm,
  },
  createCard: {
    width: 120,
    height: 120,
    borderRadius: THEME.borderRadius.card,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: THEME.colors.border,
    backgroundColor: THEME.colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.md,
  },
  plusCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(22, 56, 50, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
  },
  createCardText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 10,
    color: THEME.colors.primaryBurgundy,
    letterSpacing: 0.5,
  },
  colCard: {
    width: 150,
    height: 120,
    padding: THEME.spacing.md,
    justifyContent: 'space-between',
    marginRight: THEME.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.75)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchScore: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    color: THEME.colors.secondaryText,
  },
  colTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 15,
    color: THEME.colors.darkText,
  },
  colCount: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    color: THEME.colors.primaryBurgundy,
    letterSpacing: 0.5,
  },
  gridSection: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
