import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

interface IconProps {
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
  fill?: string;
  strokeWidth?: number;
}

// Simple Unicode/Emoji based icons
const createIcon = (unicode: string) => {
  return (props: IconProps) => (
    <Text style={[{ fontSize: props.size || 24, color: props.color || 'black' }, props.style]}>
      {unicode}
    </Text>
  );
};

export const Search = createIcon('🔍');
export const SlidersHorizontal = createIcon('⚙️');
export const CloudSun = createIcon('⛅');
export const ArrowRight = createIcon('→');
export const Menu = createIcon('☰');
export const Bell = createIcon('🔔');
export const Cpu = createIcon('⚡');
export const Check = createIcon('✓');
export const X = createIcon('✕');
export const ImageIcon = createIcon('🖼️');
export const History = createIcon('⏱️');
export const Info = createIcon('ℹ️');
export const Send = createIcon('📤');
export const Sparkles = createIcon('✨');
export const RefreshCw = createIcon('🔄');
export const Bookmark = createIcon('🔖');
export const Plus = createIcon('➕');
export const Cloud = createIcon('☁️');
export const Home = createIcon('🏠');
export const Compass = createIcon('🧭');
export const Shirt = createIcon('👕');
export const Calendar = createIcon('📅');
export const Heart = createIcon('❤️');
export const Scan = createIcon('📱');
export const ShoppingBag = createIcon('🛍️');
