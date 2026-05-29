import { Platform } from 'react-native';

export const THEME = {
  colors: {
    // Light Mode - Deep Emerald & Luxury Mint
    primaryBurgundy: '#163832', // Deep Emerald
    softBeigeBackground: '#DAF1DE', // Luxury Mint Background
    cardBackground: '#DAF1DE', // Luxury Mint Card
    darkText: '#051F20', // Primary Dark
    secondaryText: '#235347', // Muted Emerald
    border: '#8EB69B', // Soft Sage
    borderLight: 'rgba(142, 182, 155, 0.35)',
    whiteGlass: 'rgba(218, 241, 222, 0.72)',
    shadow: 'rgba(5, 31, 32, 0.06)',
    white: '#FFFFFF',
    transparent: 'transparent',
    overlay: 'rgba(5, 31, 32, 0.4)',
    overlayDark: 'rgba(5, 31, 32, 0.65)',
    gold: '#8EB69B', // Soft Sage
    dustyRose: '#8EB69B',

    // Dark Mode - Deep Emerald & Botanical Dark
    dark: {
      background: '#051F20', // Primary Dark
      card: '#0B2B26', // Elevated Surface / Secondary Dark
      primaryBurgundy: '#235347', // Muted Emerald Accent
      darkText: '#DAF1DE', // Dark Mode Headline (Luxury Mint)
      secondaryText: '#8EB69B', // Soft Sage Highlight
      border: '#163832', // Deep Emerald
      borderLight: 'rgba(22, 56, 50, 0.3)',
      whiteGlass: 'rgba(11, 43, 38, 0.72)',
      shadow: 'rgba(0, 0, 0, 0.4)',
      gold: '#8EB69B', // Soft Sage
    }
  },
  typography: {
    heading: {
      fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
      fontWeight: '700' as const,
      letterSpacing: 0.8,
      color: '#051F20',
    },
    headingLight: {
      fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
      fontWeight: '300' as const,
      letterSpacing: 1.2,
      color: '#051F20',
    },
    body: {
      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-light',
      letterSpacing: 0.3,
      color: '#235347',
    },
    bodyBold: {
      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
      fontWeight: '600' as const,
      letterSpacing: 0.3,
      color: '#051F20',
    },
    uppercase: {
      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
      fontWeight: '600' as const,
      letterSpacing: 2.5,
      textTransform: 'uppercase' as const,
      color: '#235347',
    },
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 18,
    lg: 28,
    xl: 36,
    xxl: 48,
  },
  borderRadius: {
    card: 16,
    button: 10,
    pill: 28,
    input: 10,
  },
  shadows: {
    premium: {
      shadowColor: '#051F20',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.06,
      shadowRadius: 18,
      elevation: 2,
    },
    premiumDeep: {
      shadowColor: '#051F20',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.12,
      shadowRadius: 28,
      elevation: 6,
    },
    warm: {
      shadowColor: '#163832',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.05,
      shadowRadius: 20,
      elevation: 3,
    },
  },
  motion: {
    durations: {
      micro: 200,
      screen: 450,
      hero: 700,
    },
    easing: {
       luxuryBezier: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
    stagger: {
      sectionDelay: 120,
      cardDelay: 80,
    },
    spring: {
      press: { friction: 8, tension: 100 },
      gentle: { friction: 12, tension: 40 },
    },
  },
  atmosphere: {
    ambientGradient: { start: '#DAF1DE', end: '#B5D4BB' }, // Luxury Mint to soft green sand
    vignette: 'rgba(5, 31, 32, 0.04)', // subtle botanical vignette
    filmGrain: 'rgba(5, 31, 32, 0.015)',
    heroGlow: 'rgba(22, 56, 50, 0.08)', // soft emerald glow
    scannerVignette: 'rgba(5, 31, 32, 0.35)',
  }
};
