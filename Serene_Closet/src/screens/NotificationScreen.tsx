import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeLayout } from '../components/SafeLayout';
import { EditorialHeader } from '../components/EditorialHeader';
import { GlassCard } from '../components/GlassCard';
import { THEME } from '../theme';
import { Sparkles, Shirt } from '../components/Icons';

export const NotificationScreen = ({ navigation }: any) => {
  const alerts = [
    {
      id: '1',
      title: 'Daily Style Composition Ready',
      desc: 'Breezy & mild skies predicted in Bangalore (24°C). We curated a cashmere layers suggestion tailored for your morning board meetings.',
      type: 'ai',
      time: '9:00 AM'
    },
    {
      id: '2',
      title: 'Wardrobe Optimization Triggered',
      desc: 'Your Classic Trench Coat has not been active in your archives for 14 days. We suggest matching it with the Straight Wool Pants today.',
      type: 'closet',
      time: 'Yesterday'
    },
    {
      id: '3',
      title: 'Express Delivery Dispatched',
      desc: 'Courier SRN-845623-IN containing your Silk Draped Gown has left the sorting suite. Estimated handoff at 2:00 PM tomorrow.',
      type: 'express',
      time: '2 days ago'
    }
  ];

  return (
    <SafeLayout statusBarMode="dark-content" style={styles.container}>
      <EditorialHeader
        title="Concierge Feed"
        subtitle="Stylist Suggestion Timelines"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.feedContainer}>
          <Text style={styles.sectionLabel}>LATEST INSIGHT LOGS</Text>

          {alerts.map((item) => (
            <GlassCard key={item.id} style={styles.alertCard} opacity={0.92}>
              <View style={styles.alertHeader}>
                <View style={styles.iconRow}>
                  {item.type === 'ai' ? (
                    <Sparkles size={12} color={THEME.colors.primaryBurgundy} fill={THEME.colors.primaryBurgundy} />
                  ) : (
                    <Shirt size={12} color={THEME.colors.primaryBurgundy} />
                  )}
                  <Text style={styles.badgeText}>
                    {item.type === 'ai' ? 'COGNITIVE STYLIST' : 'ARCHIVE METRIC'}
                  </Text>
                </View>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>

              <Text style={styles.alertTitle}>{item.title}</Text>
              <Text style={styles.alertDesc}>{item.desc}</Text>

              {item.type === 'ai' && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('Stylist')}
                  style={styles.actionBtn}
                >
                  <Text style={styles.actionBtnText}>Review Styling Details</Text>
                </TouchableOpacity>
              )}
            </GlassCard>
          ))}
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
  feedContainer: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.sm,
  },
  sectionLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 2,
    color: THEME.colors.secondaryText,
    marginBottom: THEME.spacing.md,
  },
  alertCard: {
    padding: THEME.spacing.md + 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.75)',
    marginBottom: THEME.spacing.md,
    ...THEME.shadows.premium,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 56, 50, 0.05)',
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.pill,
  },
  badgeText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    letterSpacing: 1,
    color: THEME.colors.primaryBurgundy,
    marginLeft: 4,
  },
  timeText: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 10,
    color: THEME.colors.secondaryText,
  },
  alertTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 16,
    color: THEME.colors.darkText,
    marginBottom: 4,
  },
  alertDesc: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12.5,
    color: THEME.colors.secondaryText,
    lineHeight: 17,
  },
  actionBtn: {
    borderTopWidth: 1,
    borderTopColor: THEME.colors.borderLight,
    marginTop: THEME.spacing.md,
    paddingTop: THEME.spacing.sm,
    alignItems: 'flex-end',
  },
  actionBtnText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 11,
    color: THEME.colors.primaryBurgundy,
    letterSpacing: 0.5,
  },
});
