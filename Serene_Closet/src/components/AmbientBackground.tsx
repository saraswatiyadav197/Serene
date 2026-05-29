import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AmbientBackgroundProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  showGlow?: boolean;
  glowPosition?: 'top' | 'center';
}

const AmbientBackground: React.FC<AmbientBackgroundProps> = ({
  children,
  style,
  showGlow = true,
  glowPosition = 'top',
}) => {
  return (
    <View style={[styles.container, style]}>
      {showGlow && (
        <LinearGradient
          colors={['transparent', '#6C63FF'] as [string, string]}
          style={[
            styles.glow,
            glowPosition === 'center'
              ? styles.centerGlow
              : styles.topGlow,
          ]}
        />
      )}

      {children}
    </View>
  );
};

export default AmbientBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  glow: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.25,
  },

  topGlow: {
    top: -100,
    alignSelf: 'center',
  },

  centerGlow: {
    top: '30%',
    alignSelf: 'center',
  },
});