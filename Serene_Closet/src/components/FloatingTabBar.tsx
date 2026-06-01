import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Animated, Dimensions, Vibration } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Home, Compass, Scan, Shirt, Sparkles } from './Icons';
import { THEME } from '../theme';
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');
const BAR_WIDTH = width - 32;
const TAB_WIDTH = BAR_WIDTH / 5;

export const FloatingTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { colors, isDarkMode } = useTheme();

  const slideAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current; // Scan pulse scale
  const pulseOpacity = useRef(new Animated.Value(0.6)).current; // Scan pulse opacity

  // Tab scale values
  const scaleAnims = useRef(state.routes.map(() => new Animated.Value(1))).current;

  // Slide Indicator transition
  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
      friction: 9,
      tension: 50,
    }).start();
  }, [state.index, slideAnim]);

  // Center button pulse loop
  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.45,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1.0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(pulseOpacity, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseOpacity, {
            toValue: 0.6,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    pulseLoop.start();
    return () => pulseLoop.stop();
  }, [pulseAnim, pulseOpacity]);

  const getIcon = (routeName: string, color: string, focused: boolean) => {
    const size = 18;
    const strokeWidth = focused ? 2.2 : 1.3;

    switch (routeName) {
      case 'HomeTab':
        return <Home size={size} color={color} strokeWidth={strokeWidth} />;
      case 'Explore':
        return <Compass size={size} color={color} strokeWidth={strokeWidth} />;
      case 'Scan':
        return (
          <View style={styles.scanWrapper}>
            {/* Pulsing glow ring around scan button */}
            <Animated.View
              style={[
                styles.pulseRing,
                {
                  transform: [{ scale: pulseAnim }],
                  opacity: pulseOpacity,
                  backgroundColor: colors.gold,
                },
              ]}
            />
            <View 
              style={[
                styles.scanCircle, 
                { 
                  backgroundColor: colors.primaryBurgundy,
                  borderColor: colors.cardBackground,
                },
                focused && {
                  backgroundColor: colors.darkText,
                }
              ]}
            >
              <Scan
                size={22}
                color={focused ? (isDarkMode ? colors.gold : colors.cardBackground) : '#FFFFFF'}
                strokeWidth={2}
              />
            </View>
          </View>
        );
      case 'Closet':
        return <Shirt size={size} color={color} strokeWidth={strokeWidth} />;
      case 'Stylist':
        return <Sparkles size={size} color={color} strokeWidth={strokeWidth} />;
      default:
        return null;
    }
  };

  const handlePress = (routeKey: string, routeName: string, index: number, isFocused: boolean) => {
    // Soft luxury haptic vibration feedback
    Vibration.vibrate(10);

    // Trigger scale-down animation
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 0.88,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[index], {
        toValue: 1.0,
        duration: 110,
        useNativeDriver: true,
      }),
    ]).start();

    const event = navigation.emit({
      type: 'tabPress',
      target: routeKey,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  const containerStyle = [
    styles.container,
    {
      backgroundColor: isDarkMode ? 'rgba(11, 43, 38, 0.88)' : 'rgba(218, 241, 222, 0.82)',
      borderColor: isDarkMode ? 'rgba(142, 182, 155, 0.12)' : 'rgba(255, 255, 255, 0.85)',
      shadowColor: isDarkMode ? '#000000' : '#051F20',
      shadowOpacity: isDarkMode ? 0.35 : 0.12,
    },
  ];

  const indicatorStyle = [
    styles.indicator,
    {
      transform: [{ translateX: slideAnim }],
      backgroundColor: isDarkMode ? 'rgba(35, 83, 71, 0.18)' : 'rgba(22, 56, 50, 0.06)',
      borderColor: isDarkMode ? 'rgba(35, 83, 71, 0.28)' : 'rgba(22, 56, 50, 0.1)',
    },
  ];

  return (
    <View style={containerStyle}>
      {/* Active Tab Background Slide Indicator */}
      <Animated.View style={indicatorStyle} />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const activeColor = colors.primaryBurgundy;
        const inactiveColor = colors.secondaryText;
        const color = isFocused ? activeColor : inactiveColor;

        const animatedContentStyle = [
          styles.tabContent,
          {
            transform: [{ scale: scaleAnims[index] || 1 }],
          },
        ];

        const labelTextColorStyle = { color };
        const selectedLabelTextStyle = isFocused ? { color: colors.primaryBurgundy } : undefined;
        const labelTextStyle = [styles.label, labelTextColorStyle, selectedLabelTextStyle];
        const activeDotStyle = [styles.activeDot, { backgroundColor: colors.primaryBurgundy }];

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => handlePress(route.key, route.name, index, isFocused)}
            style={styles.tabItem}
            activeOpacity={1}
          >
            <Animated.View style={animatedContentStyle}>
              {getIcon(route.name, color, isFocused)}
              <Text style={labelTextStyle}>
                {label.toString().toUpperCase()}
              </Text>

              {/* Active Tab Ambient Dot Glow */}
              {isFocused && route.name !== 'Scan' && <View style={activeDotStyle} />}
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    height: 68,
    borderRadius: 34,
    borderWidth: 0.5,
    alignItems: 'center',
    paddingHorizontal: 0,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 32,
    elevation: 8,
  },
  indicator: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: TAB_WIDTH - 12,
    height: 56,
    borderRadius: 28,
    borderWidth: 0.5,
  },
  tabItem: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  label: {
    fontFamily: THEME.typography.uppercase.fontFamily,
    fontSize: 8,
    letterSpacing: 1.2,
    marginTop: 4,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  activeDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    position: 'absolute',
    bottom: -8,
  },
  scanWrapper: {
    position: 'relative',
    height: 36,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseRing: {
    position: 'absolute',
    top: -24,
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: -1,
  },
  scanCircle: {
    position: 'absolute',
    top: -24,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
});
