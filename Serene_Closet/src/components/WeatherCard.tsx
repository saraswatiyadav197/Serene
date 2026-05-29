import React from 'react';
import { StyleSheet, Text, View, ViewStyle, Vibration } from 'react-native';
import { CloudSun, ArrowRight } from './Icons';
import { THEME } from '../theme';
import { useTheme } from '../theme/ThemeContext';
import { GlassCard } from './GlassCard';
import { LuxuryButton } from './LuxuryButton';

interface WeatherCardProps {
  location?: string;
  temperature?: string;
  condition?: string;
  recommendation?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  location = 'Bangalore',
  temperature = '24°C',
  condition = 'Breezy & Mild',
  recommendation = 'Perfect for a warm layered look. I suggest pairing the Pure Cashmere ribbed knit with tailored trousers.',
  onActionPress,
  style,
}) => {
  const { colors, isDarkMode } = useTheme();

  const handleAction = () => {
    Vibration.vibrate(10);
    if (onActionPress) onActionPress();
  };

  return (
    <GlassCard style={[styles.container, style]} opacity={isDarkMode ? 0.85 : 0.78}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.location, { color: colors.darkText }]}>{location.toUpperCase()} • {temperature}</Text>
          <Text style={[styles.condition, { color: colors.primaryBurgundy }]}>{condition}</Text>
        </View>
        <CloudSun size={26} color={colors.primaryBurgundy} strokeWidth={1.5} />
      </View>
      
      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <Text style={[styles.tipTitle, { color: colors.secondaryText }]}>AI DAILY RECOMMENDATION</Text>
      <Text style={[styles.recommendationText, { color: colors.darkText }]}>{recommendation}</Text>

      {onActionPress && (
        <LuxuryButton
          title="View Suggested Look"
          onPress={handleAction}
          variant="outline"
          style={styles.button}
          textStyle={styles.buttonText}
          icon={<ArrowRight size={13} color={colors.primaryBurgundy} style={{ marginRight: 4 }} />}
        />
      )}
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: THEME.spacing.md,
    marginBottom: THEME.spacing.lg,
    padding: THEME.spacing.md + 4,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Georgia',
    fontSize: 10.5,
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  condition: {
    fontFamily: 'Georgia',
    fontSize: 20,
    marginTop: THEME.spacing.xs,
    fontWeight: '700',
  },
  divider: {
    height: 0.5,
    marginVertical: THEME.spacing.md,
    opacity: 0.4,
  },
  tipTitle: {
    fontFamily: 'Georgia',
    fontSize: 8.5,
    letterSpacing: 1.8,
    marginBottom: THEME.spacing.xs,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  recommendationText: {
    fontFamily: 'Georgia',
    fontSize: 12.5,
    lineHeight: 18,
  },
  button: {
    height: 38,
    marginTop: THEME.spacing.md,
    borderRadius: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: THEME.spacing.md,
  },
  buttonText: {
    fontSize: 10.5,
    letterSpacing: 1.2,
  },
});
