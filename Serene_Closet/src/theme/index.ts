export const THEME = {
  colors: {
    // Light Palette (serene brand adapted to requested colors)
    primaryBurgundy: '#6B0F1A',
    warmBeige: '#EADCC8',
    accentGold: '#C9A84B',
    softCreamBackground: '#FFF6F0',
    textDarkCharcoal: '#222222',
    secondaryText: '#5B5048',
    border: '#D6C6B6',
    borderLight: 'rgba(214, 198, 182, 0.35)',
    whiteGlass: 'rgba(255, 246, 240, 0.78)',
    shadow: 'rgba(34, 34, 34, 0.06)',
    white: '#FFFFFF',
    transparent: 'transparent',
    overlay: 'rgba(34,34,34,0.32)',
    softBeigeBackground: '#FFF6F0',
    cardBackground: '#FFF6F0',
    darkText: '#222222',
    gold: '#C9A84B',
    card: '#FFF6F0',

    // Dark palette fallback
    dark: {
      background: '#111111',
      card: '#1A1A1A',
      primaryBurgundy: '#7A1A24',
      darkText: '#F6F4F2',
      textDarkCharcoal: '#F6F4F2',
      softCreamBackground: '#1A1A1A',
      softBeigeBackground: '#1A1A1A',
      cardBackground: '#1A1A1A',
      white: '#FFFFFF',
      transparent: 'transparent',
      overlay: 'rgba(255,255,255,0.06)',
      secondaryText: '#C9B69A',
      border: '#2A2A2A',
      borderLight: 'rgba(255,255,255,0.06)',
      whiteGlass: 'rgba(20,20,20,0.72)',
      shadow: 'rgba(0,0,0,0.6)',
      accentGold: '#C9A84B',
      gold: '#C9A84B',
    },
  },
  typography: {
    heading: {
      fontFamily: 'PlayfairDisplay_700Bold',
      fontWeight: '700' as const,
      letterSpacing: 0.6,
      color: '#222222',
    },
    headingLight: {
      fontFamily: 'PlayfairDisplay_400Regular',
      fontWeight: '400' as const,
      letterSpacing: 0.8,
      color: '#222222',
    },
    body: {
      fontFamily: 'Inter_400Regular',
      letterSpacing: 0.2,
      color: '#5B5048',
    },
    bodyBold: {
      fontFamily: 'Inter_600SemiBold',
      fontWeight: '600' as const,
      letterSpacing: 0.2,
      color: '#222222',
    },
    uppercase: {
      fontFamily: 'Inter_600SemiBold',
      fontWeight: '600' as const,
      letterSpacing: 2,
      textTransform: 'uppercase' as const,
      color: '#5B5048',
    },
  },
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },
  borderRadius: {
    small: 12,
    medium: 16,
    large: 20,
    card: 24,
    xl: 24,
    pill: 999,
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
    ambientGradient: { start: '#FFF6F0', end: '#EADCC8' }, // soft cream to warm beige
    vignette: 'rgba(34, 34, 34, 0.04)', // subtle soft vignette
    filmGrain: 'rgba(34, 34, 34, 0.015)',
    heroGlow: 'rgba(107, 15, 26, 0.06)', // soft burgundy glow
    scannerVignette: 'rgba(34, 34, 34, 0.35)',
  }
};
