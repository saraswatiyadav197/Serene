import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { SafeLayout } from '../components/SafeLayout';
import { EditorialHeader } from '../components/EditorialHeader';
import { GlassCard } from '../components/GlassCard';
import { THEME } from '../theme';
import { EXPLORE_PRODUCTS } from '../utils/mockData';
import { Sparkles } from '../components/Icons';

export const OrderTrackingScreen = ({ route, navigation }: any) => {
  const { productId } = route.params || { productId: 'e1' };
  const product = EXPLORE_PRODUCTS.find((p) => p.id === productId) || EXPLORE_PRODUCTS[0];

  const steps = [
    { title: 'Atelier Dispatched', desc: 'Handcrafted selection boxed in silk tissue.', time: '2:15 PM', active: true },
    { title: 'Carbon Neutral Transit', desc: 'Electric vehicle dispatched for local sorting.', time: '3:30 PM', active: true },
    { title: 'Express Concierge Sorting', desc: 'Inspected for custom fold line quality.', time: 'Pending', active: false },
    { title: 'Secured Handover', desc: 'Awaiting signature at Indiranagar.', time: 'Estimated Tomorrow', active: false }
  ];

  return (
    <SafeLayout statusBarMode="dark-content" style={styles.container}>
      <EditorialHeader
        title="Delivery Capsule"
        subtitle="Active Concierge Logistics"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Product Details Header */}
        <View style={styles.headerInfo}>
          <Image source={{ uri: product.image }} style={styles.productImg} />
          <View style={styles.meta}>
            <Text style={styles.category}>{product.category.toUpperCase()}</Text>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.waybill}>SECURE ID: SRN-845623-IN</Text>
          </View>
        </View>

        {/* Eco Green Footprint Stats Card */}
        <View style={styles.statsSection}>
          <GlassCard style={styles.statsCard} opacity={0.92}>
            <View style={styles.statsTitleRow}>
              <Sparkles size={14} color={THEME.colors.primaryBurgundy} fill={THEME.colors.primaryBurgundy} />
              <Text style={styles.statsTitle}>ECO-CONSCIOUS LOGISTICS</Text>
            </View>
            <Text style={styles.statsDesc}>
              This delivery capsule is routed via carbon-neutral express services. Total packaging material: 100% biodegradable organic silk bags.
            </Text>
            <View style={styles.divider} />
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Text style={styles.statVal}>98%</Text>
                <Text style={styles.statLabel}>Green Rating</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statVal}>0.2 kg</Text>
                <Text style={styles.statLabel}>CO₂ Rested</Text>
              </View>
            </View>
          </GlassCard>
        </View>

        {/* Luxury Timeline Steps */}
        <View style={styles.timelineSection}>
          <Text style={styles.sectionLabel}>SHIPMENT MILESTONES</Text>
          <View style={styles.timeline}>
            {steps.map((step, idx) => (
              <View key={step.title} style={styles.timelineItem}>
                {/* Visual Line */}
                <View style={styles.lineCol}>
                  <View style={[styles.dot, step.active && styles.dotActive]} />
                  {idx < steps.length - 1 && (
                    <View style={[styles.line, step.active && styles.lineActive]} />
                  )}
                </View>
                {/* Content */}
                <View style={styles.contentCol}>
                  <View style={styles.itemHeader}>
                    <Text style={[styles.itemTitle, step.active && styles.itemTitleActive]}>
                      {step.title}
                    </Text>
                    <Text style={styles.itemTime}>{step.time}</Text>
                  </View>
                  <Text style={styles.itemDesc}>{step.desc}</Text>
                </View>
              </View>
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
    paddingBottom: 40,
  },
  headerInfo: {
    flexDirection: 'row',
    marginHorizontal: THEME.spacing.md,
    backgroundColor: THEME.colors.cardBackground,
    borderRadius: THEME.borderRadius.card,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    padding: THEME.spacing.md,
    alignItems: 'center',
    ...THEME.shadows.premium,
    marginTop: THEME.spacing.sm,
  },
  productImg: {
    width: 56,
    height: 72,
    borderRadius: THEME.borderRadius.card - 10,
  },
  meta: {
    marginLeft: THEME.spacing.md,
    flex: 1,
  },
  category: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    letterSpacing: 1.5,
    color: THEME.colors.primaryBurgundy,
  },
  title: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 16,
    color: THEME.colors.darkText,
    marginTop: 2,
  },
  waybill: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 0.5,
    color: THEME.colors.secondaryText,
    marginTop: 4,
  },
  statsSection: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.lg,
  },
  statsCard: {
    padding: THEME.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.75)',
  },
  statsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs + 2,
  },
  statsTitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 1.5,
    color: THEME.colors.primaryBurgundy,
    marginLeft: 6,
  },
  statsDesc: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12,
    color: THEME.colors.secondaryText,
    lineHeight: 17,
  },
  divider: {
    height: 1,
    backgroundColor: THEME.colors.border,
    marginVertical: THEME.spacing.md,
    opacity: 0.4,
  },
  statRow: {
    flexDirection: 'row',
  },
  statItem: {
    marginRight: THEME.spacing.xl,
  },
  statVal: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 20,
    color: THEME.colors.primaryBurgundy,
  },
  statLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    color: THEME.colors.secondaryText,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  timelineSection: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.xl,
  },
  sectionLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 2,
    color: THEME.colors.secondaryText,
    marginBottom: THEME.spacing.lg,
  },
  timeline: {
    paddingLeft: THEME.spacing.xs,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  lineCol: {
    alignItems: 'center',
    marginRight: THEME.spacing.md,
    position: 'relative',
    width: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(122, 106, 106, 0.25)',
    zIndex: 2,
    marginTop: 4,
  },
  dotActive: {
    backgroundColor: THEME.colors.primaryBurgundy,
    borderWidth: 2,
    borderColor: THEME.colors.cardBackground,
    shadowColor: THEME.colors.primaryBurgundy,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  line: {
    position: 'absolute',
    top: 14,
    bottom: -24,
    width: 2,
    backgroundColor: 'rgba(122, 106, 106, 0.15)',
    zIndex: 1,
  },
  lineActive: {
    backgroundColor: THEME.colors.primaryBurgundy,
  },
  contentCol: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 13,
    color: THEME.colors.secondaryText,
  },
  itemTitleActive: {
    color: THEME.colors.darkText,
  },
  itemTime: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 10,
    color: THEME.colors.secondaryText,
  },
  itemDesc: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 11.5,
    color: THEME.colors.secondaryText,
    marginTop: 4,
    lineHeight: 16,
  },
});
