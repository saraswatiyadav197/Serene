import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { Sparkles, ArrowRight } from './Icons';
import { GlassCard } from './GlassCard';
import { THEME } from '../theme';

interface AIInsightCardProps {
  title: string;
  matchScore: number;
  insight: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({
  title,
  matchScore,
  insight,
  onPress,
  style,
}) => {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.92 : 1}
      onPress={onPress}
      disabled={!onPress}
      style={style}
    >
      <GlassCard style={styles.card} opacity={0.92}>
        <View style={styles.headerRow}>
          <View style={styles.aiTag}>
            <Sparkles size={12} color={THEME.colors.primaryBurgundy} fill={THEME.colors.primaryBurgundy} />
            <Text style={styles.aiTagText}>AI CONCIERGE</Text>
          </View>
          <View style={styles.scoreBadge}>
            <Animated.View style={[styles.pulseDot, { opacity: pulseAnim }]} />
            <Text style={styles.scoreText}>{matchScore}% MATCH</Text>
          </View>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.insight}>{insight}</Text>

        {onPress && (
          <View style={styles.actionRow}>
            <Text style={styles.actionText}>View Styling Capsule</Text>
            <ArrowRight size={14} color={THEME.colors.primaryBurgundy} />
          </View>
        )}
      </GlassCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: THEME.spacing.md + 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    ...THEME.shadows.premiumDeep,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  aiTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 0, 31, 0.06)',
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.pill,
    borderWidth: 0.5,
    borderColor: 'rgba(139, 0, 31, 0.15)',
  },
  aiTagText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    color: THEME.colors.primaryBurgundy,
    letterSpacing: 1.5,
    marginLeft: 4,
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D4AF37', // Muted Gold Accent
    marginRight: 6,
  },
  scoreText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 1,
    color: THEME.colors.secondaryText,
  },
  title: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 20,
    color: THEME.colors.darkText,
    marginBottom: THEME.spacing.sm,
  },
  insight: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 13,
    color: THEME.colors.secondaryText,
    lineHeight: 18,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: THEME.spacing.md,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.borderLight,
    paddingTop: THEME.spacing.sm,
  },
  actionText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 11,
    color: THEME.colors.primaryBurgundy,
    letterSpacing: 0.5,
    marginRight: 6,
  },
});
