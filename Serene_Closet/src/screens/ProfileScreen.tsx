import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeLayout } from '../components/SafeLayout';
import { EditorialHeader } from '../components/EditorialHeader';
import { GlassCard } from '../components/GlassCard';
import { THEME } from '../theme';
import { IMAGES } from '../utils/mockData';
import { Sparkles, Calendar, ArrowRight } from '../components/Icons';

export const ProfileScreen = ({ navigation }: any) => {
  return (
    <SafeLayout statusBarMode="dark-content" style={styles.container}>
      <EditorialHeader
        title="Membership Concierge"
        subtitle="Exclusive Member Dashboard"
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Luxury Avatar & Identification Card */}
        <View style={styles.avatarSection}>
          <Image source={{ uri: IMAGES.avatar }} style={styles.avatar} />
          <Text style={styles.memberName}>Sarswati Shrestha</Text>
          <Text style={styles.memberTier}>SERENE PRIVÉ MEMBERSHIP</Text>
          <View style={styles.dateTag}>
            <Calendar size={10} color={THEME.colors.secondaryText} />
            <Text style={styles.dateTagText}>Active Since May 2024</Text>
          </View>
        </View>

        {/* Sustainability & Environmental Footprint Metrics */}
        <View style={styles.metricsSection}>
          <Text style={styles.sectionLabel}>WARDROBE SUSTAINABILITY ARCHIVE</Text>
          <GlassCard style={styles.metricsCard} opacity={0.92}>
            <View style={styles.metricsHeader}>
              <Sparkles size={14} color={THEME.colors.primaryBurgundy} fill={THEME.colors.primaryBurgundy} />
              <Text style={styles.metricsTitle}>COGNITIVE FIBER DIVERSITY</Text>
            </View>
            <Text style={styles.metricsDesc}>
              Your current wardrobe has achieved an ultra-premium organic fiber footprint. Mostly organic silks, linen, and pure Mongolian cashmere.
            </Text>
            <View style={styles.divider} />
            <View style={styles.row}>
              <View style={styles.metricItem}>
                <Text style={styles.metricVal}>92%</Text>
                <Text style={styles.metricLabel}>Organic Ratio</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricVal}>86</Text>
                <Text style={styles.metricLabel}>Sustainability Score</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricVal}>14.5 kg</Text>
                <Text style={styles.metricLabel}>CO₂ Neutral</Text>
              </View>
            </View>
          </GlassCard>
        </View>

        {/* Exclusive Menu Navigation List */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionLabel}>EXPLICIT PRIVILEGES</Text>
          
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Wishlist')}
            style={styles.menuItem}
          >
            <View>
              <Text style={styles.menuItemTitle}>Saved Curations</Text>
              <Text style={styles.menuItemSub}>Browse your curated high-fashion capsules</Text>
            </View>
            <ArrowRight size={14} color={THEME.colors.primaryBurgundy} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Notifications')}
            style={styles.menuItem}
          >
            <View>
              <Text style={styles.menuItemTitle}>Concierge Notifications</Text>
              <Text style={styles.menuItemSub}>Weather style suggestions & wardrobe alerts</Text>
            </View>
            <ArrowRight size={14} color={THEME.colors.primaryBurgundy} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Settings')}
            style={styles.menuItem}
          >
            <View>
              <Text style={styles.menuItemTitle}>Private Settings</Text>
              <Text style={styles.menuItemSub}>Biometrics, security configurations, and dark toggle</Text>
            </View>
            <ArrowRight size={14} color={THEME.colors.primaryBurgundy} />
          </TouchableOpacity>
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
  avatarSection: {
    alignItems: 'center',
    marginTop: THEME.spacing.md,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: THEME.colors.primaryBurgundy,
    ...THEME.shadows.premiumDeep,
  },
  memberName: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 22,
    color: THEME.colors.darkText,
    marginTop: THEME.spacing.md,
  },
  memberTier: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    letterSpacing: 2.5,
    color: THEME.colors.primaryBurgundy,
    marginTop: 4,
  },
  dateTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: THEME.spacing.sm,
    backgroundColor: 'rgba(122, 106, 106, 0.05)',
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.pill,
  },
  dateTagText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    color: THEME.colors.secondaryText,
    marginLeft: 6,
  },
  metricsSection: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.xl,
  },
  sectionLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 2,
    color: THEME.colors.secondaryText,
    marginBottom: THEME.spacing.md,
  },
  metricsCard: {
    padding: THEME.spacing.md + 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.75)',
  },
  metricsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs + 2,
  },
  metricsTitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 1.5,
    color: THEME.colors.primaryBurgundy,
    marginLeft: 6,
  },
  metricsDesc: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12.5,
    color: THEME.colors.secondaryText,
    lineHeight: 17,
  },
  divider: {
    height: 1,
    backgroundColor: THEME.colors.border,
    marginVertical: THEME.spacing.md,
    opacity: 0.4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricItem: {
    flex: 1,
  },
  metricVal: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 20,
    color: THEME.colors.primaryBurgundy,
  },
  metricLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    color: THEME.colors.secondaryText,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  menuSection: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.xl,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: THEME.colors.cardBackground,
    borderRadius: THEME.borderRadius.card - 4,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.sm,
    ...THEME.shadows.premium,
  },
  menuItemTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 15,
    color: THEME.colors.darkText,
  },
  menuItemSub: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 11,
    color: THEME.colors.secondaryText,
    marginTop: 2,
  },
});
